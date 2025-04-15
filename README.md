# resonance

**resonance** is a web application that allows users to visualize the most popular Spotify songs in different countries. The app uses a 3D globe to represent countries, and users can search for a country to highlight it and see its top tracks in real time.

## Features

- **Interactive 3D Globe**: A beautiful 3D visualization of the world using `@react-three/fiber` and `three.js`.
- **Search for Countries**: Easily search for any country to highlight it on the globe and view its most popular Spotify songs.
- **Real-time Data**: The app fetches and visualizes the most popular songs from Spotify by country.
- **Graticule Lines**: Latitude and longitude lines on the globe to give a more accurate geographical context.

## Technologies Used

- **React**: For building the user interface.
- **Vite**: A fast development server for React applications.
- **@react-three/fiber**: React renderer for Three.js to build the 3D globe.
- **Three.js**: For rendering 3D geometries (the globe and country outlines).
- **D3.js**: For handling geographical data and rendering the graticule.
- **Spotify API**: For fetching the most popular songs in each country.

## Local Setup

1. Clone the repository:

   ```bash
   git clone <repository-url>
   cd <repository-folder>
   ```

2. Install dependencies:

    ```bash
    npm install
    ```

3. Set up environment variables

    You'll need to create a `.env` file to store your Spotify API credentials. Example:

    ```ini
    VITE_SPOTIFY_CLIENT_ID=your_spotify_client_id
    VITE_SPOTIFY_CLIENT_SECRET=your_spotify_client_secret
    ```

4. Run the development server:

    ```bash
    npm run dev
    ```

5. Open the application in your browser at `http://localhost:3000`.

## Usage

- **Search for Countries**: Type the name of any country in the search bar to highlight that country on the globe.
- **Explore Popular Tracks**: When you highlight a country, the app fetches and displays the most popular Spotify tracks from that country.

## License

This project is licensed under the MIT License - see the [LICENSE](https://github.com/bjaxqq/resonance/blob/master/LICENSE) file for details.
