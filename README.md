# Zoning Land Use Planner

A full-stack web application for comparing land parcels' current zoning against future land use plans for any municipality or county.

## Features

- 🗺️ Interactive map visualization using Mapbox
- 🏘️ Parcel search by address, ID, or map selection
- 📊 Side-by-side comparison of current zoning vs future land use
- 🌍 Support for multiple municipalities and counties
- 📥 Data import via ArcGIS REST APIs or file upload (GeoJSON, Shapefile)
- 🗄️ PostGIS spatial database for efficient geospatial queries

## Tech Stack

**Frontend:**
- React + TypeScript
- Vite (build tool)
- Tailwind CSS
- Shadcn/ui components
- Mapbox GL JS

**Backend:**
- Node.js + Express
- TypeScript
- PostgreSQL + PostGIS

## Getting Started

### Prerequisites

- Node.js 18+
- Docker (for PostgreSQL + PostGIS)
- Mapbox account and access token

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd Zoning
```

2. Install dependencies:
```bash
npm run install:all
```

3. Set up environment variables:
```bash
cp client/.env.example client/.env
cp server/.env.example server/.env
```

4. Add your Mapbox token to `client/.env`:
```
VITE_MAPBOX_TOKEN=your_mapbox_token_here
```

5. Start PostgreSQL + PostGIS:
```bash
docker-compose up -d
```

6. Run database migrations:
```bash
npm run migrate --workspace=server
```

7. Start development servers:
```bash
npm run dev
```

The app will be available at:
- Frontend: http://localhost:5173
- Backend: http://localhost:3000

## Project Structure

```
/
├── client/          # React frontend
├── server/          # Express backend
├── index.html       # Standalone HTML version (no build required)
├── docker-compose.yml
├── railway.json     # Railway deployment config
├── nixpacks.toml    # Nixpacks build config
└── package.json     # Root workspace config
```

## Quick Start (HTML Version)

For the simplest setup without any build tools:

1. Open `index.html` in a text editor
2. Add your Mapbox token (line 77)
3. Deploy backend to Railway (see DEPLOYMENT.md) OR run locally
4. Update API_URL in index.html (line 78)
5. Open index.html in your browser

## Deployment

### Deploy to Railway (Recommended)

See [DEPLOYMENT.md](./DEPLOYMENT.md) for detailed instructions.

Quick steps:
1. Push code to GitHub
2. Sign up at https://railway.app
3. Deploy from GitHub repo
4. Add PostgreSQL database
5. Copy your Railway URL
6. Update `index.html` with your Railway URL and Mapbox token

### Deploy to Render

See [DEPLOYMENT.md](./DEPLOYMENT.md) for Render deployment instructions.

## License

MIT
