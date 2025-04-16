# resonance

Explore the world through music.

## About

*resonance* is a visualization of global music trends, powered by real-time Last.fm data.  
It highlights what's currently popular in different parts of the world using an interactive 3D globe.

## API Example

Data is retrieved from the Last.fm API based on the selected country.

```js
fetch(`https://ws.audioscrobbler.com/2.0/?method=geo.gettoptracks&country=${country}&api_key=YOUR_API_KEY&format=json`)
  .then(res => res.json())
  .then(data => {
    const tracks = data.tracks.track;
    setTopTracks(tracks);
  });
```

Each response includes metadata like track name, artist, rank, and cover image.
This data populates the sidebar when a country is selected.

## Usage

- Search a country to view its top tracks.
- Click the globe to rotate and explore different regions.
- Click “docs” again to return to the main view.

## Local Development/Testing

### Prerequisites
- Node.js
- npm or yarn
- Last.fm API key (get one from https://www.last.fm/api)

### Installation

1. Clone the repository:

```bash
git clone https://github.com/bjaxqq/resonance.git
cd resonance
```

2. Create a `.env` file in the root directory:
```bash
echo "REACT_APP_LASTFM_API_KEY=your_api_key_here" > .env
```

3. Install dependencies:

```bash
npm install
# or
yarn install
```

4. Start the development server:

```bash
npm start
# or
yarn start
```

The application will open in your default browser at `http://localhost:5173`. If it doesn't then use the link in the terminal output.

## Tech Stack

[CSS](https://developer.mozilla.org/en-US/docs/Web/CSS), [HTML](https://developer.mozilla.org/en-US/docs/Web/HTML), [JavaScript](https://www.javascript.com/), [React](https://react.dev/), [React Three Fiber](https://docs.pmnd.rs/react-three-fiber), [Three.js](https://threejs.org/)

## License

This project is licensed under the MIT License - see the [LICENSE](https://github.com/bjaxqq/resonance/blob/master/LICENSE) file for details.