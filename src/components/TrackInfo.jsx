import React from 'react';
import '../styles/trackInfo.css';

export const TrackInfo = ({ track, rank }) => {
  if (!track) return null;

  return (
    <div className="track-item">
      <div className="track-rank">{rank}</div>
      <img
        src={track.image?.[2]?.['#text'] || ''}
        alt="album cover"
        className="track-cover"
      />
      <div className="track-info">
        <div className="track-title">{track.name}</div>
        <div className="track-artist">{track.artist}</div>
      </div>
    </div>
  );
};