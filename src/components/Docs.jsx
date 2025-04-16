import React from 'react';
import '../styles/docs.css';

export const Docs = () => {
  return (
    <div className="docs-container">
      <h2>resonance</h2>
      <p>Explore the world through music.</p>

      <div className="docs-section">
        <h3>Usage</h3>
        <p>Search a country to view its top tracks.</p>
        <p>Click and drag the globe to rotate and explore different regions.</p>
        <p>Click the title to return to the main view.</p>
      </div>

      <div className="docs-section">
        <h3>About</h3>
        <p><em>resonance</em> is a visualization of global music trends, powered by real-time Last.fm data. It highlights what's currently popular in different parts of the world using an interactive 3D globe.</p>
      </div>

      <div className="docs-section">
        <h3>API Example</h3>
        <p>Data is retrieved from the Last.fm API based on the selected country. Here's a simplified example of the fetch logic:</p>
        <pre>
{`fetch(\`https://ws.audioscrobbler.com/2.0/?method=geo.gettoptracks&country=\${country}&api_key=YOUR_API_KEY&format=json\`)
  .then(res => res.json())
  .then(data => {
    const tracks = data.tracks.track;
    setTopTracks(tracks);
  });`}
        </pre>
        <p>Each response contains metadata like track name, artist, rank, and cover image. This data populates the sidebar for each country.</p>
      </div>

      <div className="docs-section">
        <h3>Tech</h3>
        <p>
          <a href="https://developer.mozilla.org/en-US/docs/Web/CSS" target="_blank" rel="noopener noreferrer">CSS</a>,{' '}
          <a href="https://developer.mozilla.org/en-US/docs/Web/HTML" target="_blank" rel="noopener noreferrer">HTML</a>,{' '}
          <a href="https://www.javascript.com/" target="_blank" rel="noopener noreferrer">JavaScript</a>,{' '}
          <a href="https://react.dev/" target="_blank" rel="noopener noreferrer">React</a>,{' '}
          <a href="https://docs.pmnd.rs/react-three-fiber" target="_blank" rel="noopener noreferrer">React Three Fiber</a>,{' '}
          <a href="https://threejs.org/" target="_blank" rel="noopener noreferrer">Three.js</a>
        </p>
      </div>
    </div>
  );
};
