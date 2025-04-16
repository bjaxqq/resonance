import React, { useRef, useState, useEffect } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Stars } from '@react-three/drei';
import { Globe } from './components/Globe';
import { TrackInfo } from './components/TrackInfo';
import { SearchBar } from './components/SearchBar';
import { Docs } from './components/Docs';
import { fetchTopTracks } from './utils/lastfm';
import './App.css';
import './styles/globe.css';
import './styles/trackInfo.css';
import './styles/docs.css';

const App = () => {
  const isInteracting = useRef(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [highlightedCountry, setHighlightedCountry] = useState(null);
  const [topTracks, setTopTracks] = useState([]);
  const [showTracks, setShowTracks] = useState(true);
  const [showSearchBar, setShowSearchBar] = useState(true);
  const [showDocs, setShowDocs] = useState(false);
  const [globePosition, setGlobePosition] = useState([0, -0.35, -2]);
  const [globeConfig, setGlobeConfig] = useState({
    rotationDirection: 1,
    countryColor: '#1db954'
  });

  useEffect(() => {
    fetchTopTracks(null, setTopTracks);
  }, []);

  const handleDocsClick = () => {
    setGlobePosition([0, -0.35, 2]);
    setShowTracks(false);
    setShowSearchBar(false);
    setShowDocs(true);
    setSearchQuery('');
    setHighlightedCountry(null);
    setGlobeConfig({
      rotationDirection: -1,
      countryColor: '#ffffff'
    });
    fetchTopTracks(null, setTopTracks);
  };

  const handleTitleClick = () => {
    setGlobePosition([0, -0.35, -2]);
    setShowTracks(true);
    setShowSearchBar(true);
    setShowDocs(false);
    setGlobeConfig({
      rotationDirection: 1,
      countryColor: '#1db954'
    });
  };

  return (
    <div className="canvas-container">
      <div 
        className="overlay-text" 
        onClick={handleTitleClick}
        style={{ cursor: 'pointer', pointerEvents: 'auto' }}
      >
        resonance
      </div>
      
      {showSearchBar && (
        <SearchBar 
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          setHighlightedCountry={setHighlightedCountry}
          fetchTopTracks={(country) => fetchTopTracks(country, setTopTracks)}
        />
      )}
      
      {showTracks && (
        <div className="tracks-container">
          {topTracks.map((track, index) => (
            <TrackInfo 
              key={`${track.name}-${track.artist}-${index}`} 
              track={track} 
              rank={index + 1} 
            />
          ))}
        </div>
      )}

      {showDocs && <Docs />}

      <div className="footer-text">
        <a 
          href="#" 
          onClick={(e) => {
            e.preventDefault();
            handleDocsClick();
          }}
          style={{ pointerEvents: 'auto' }}
        >
          docs
        </a>
        <span className="pipe">|</span>
        <a href="https://github.com/bjaxqq" target="_blank" rel="noopener noreferrer">© bjaxqq 2025</a>
      </div>

      <Canvas camera={{ position: [5, 0, 0] }}>
        <Stars radius={100} depth={50} count={5000} factor={4} saturation={0} fade speed={1} />
        <Globe 
          isInteracting={isInteracting} 
          highlightedCountry={highlightedCountry} 
          position={globePosition}
          rotationDirection={globeConfig.rotationDirection}
          countryColor={globeConfig.countryColor}
        />
        <OrbitControls
          enableZoom
          enablePan
          onStart={() => { isInteracting.current = true }}
          onEnd={() => { isInteracting.current = false }}
        />
      </Canvas>
    </div>
  );
};

export default App;