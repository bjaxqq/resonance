import { getLastfmCountryName } from './countries';

const API_KEY = import.meta.env.VITE_LASTFM_API_KEY;

export const fetchTopTracks = async (country = null, setTracks, limit = 5) => {
  try {
    let url;
    let lastfmCountryName = country ? getLastfmCountryName(country) : null;
    
    if (lastfmCountryName) {
      url = `https://ws.audioscrobbler.com/2.0/?method=geo.gettoptracks&country=${encodeURIComponent(lastfmCountryName)}&api_key=${API_KEY}&format=json&limit=${limit}`;
    } else {
      url = `https://ws.audioscrobbler.com/2.0/?method=chart.gettoptracks&api_key=${API_KEY}&format=json&limit=${limit}`;
    }

    const response = await fetch(url);
    const data = await response.json();
    const baseTracks = data.tracks?.track?.slice(0, limit) || [];

    if (baseTracks.length === 0) {
      setTracks([]);
      return;
    }

    const enrichedTracks = await Promise.all(
      baseTracks.map(async (baseTrack) => {
        try {
          const infoUrl = `https://ws.audioscrobbler.com/2.0/?method=track.getInfo&api_key=${API_KEY}&artist=${encodeURIComponent(baseTrack.artist.name)}&track=${encodeURIComponent(baseTrack.name)}&format=json`;
          const infoResponse = await fetch(infoUrl);
          const infoData = await infoResponse.json();

          return {
            name: baseTrack.name,
            artist: baseTrack.artist.name,
            url: baseTrack.url,
            playcount: infoData.track?.playcount ?? baseTrack.playcount,
            album: infoData.track?.album?.title ?? '',
            image: infoData.track?.album?.image ?? baseTrack.image,
            rank: baseTrack['@attr']?.rank || null
          };
        } catch (error) {
          console.error(`Failed to fetch info for track ${baseTrack.name}:`, error);
          return {
            name: baseTrack.name,
            artist: baseTrack.artist.name,
            url: baseTrack.url,
            playcount: baseTrack.playcount,
            album: '',
            image: baseTrack.image,
            rank: baseTrack['@attr']?.rank || null
          };
        }
      })
    );

    setTracks(enrichedTracks);
  } catch (error) {
    console.error("Failed to fetch tracks:", error);
    setTracks([]);
  }
};