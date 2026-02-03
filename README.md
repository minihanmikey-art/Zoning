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
├── docker-compose.yml
└── package.json     # Root workspace config
```

## License

MIT
