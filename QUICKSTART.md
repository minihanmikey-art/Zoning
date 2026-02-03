# Quick Start Guide

## Prerequisites

- Node.js 18+ installed
- Docker installed and running
- Mapbox account and access token

## Setup Steps

### 1. Install Dependencies

```bash
npm install
```

### 2. Configure Environment Variables

Create `.env` files for both client and server:

**Client** (`client/.env`):
```bash
cp client/.env.example client/.env
```

Then edit `client/.env` and add your Mapbox token:
```
VITE_MAPBOX_TOKEN=your_mapbox_token_here
VITE_API_URL=http://localhost:3000
```

**Server** (`server/.env`):
```bash
cp server/.env.example server/.env
```

The default values should work for local development.

### 3. Start PostgreSQL + PostGIS

```bash
docker-compose up -d
```

Wait a few seconds for the database to initialize.

### 4. Run Database Migrations

```bash
cd server
npm install
npm run migrate
cd ..
```

### 5. Start Development Servers

From the root directory:

```bash
npm run dev
```

This will start both the frontend (http://localhost:5173) and backend (http://localhost:3000).

## Using the Application

1. **Search for Parcels**: Enter an address or parcel ID in the search bar
2. **View on Map**: Parcels will appear color-coded:
   - Green: Current zoning matches future land use
   - Red: Zoning change may be required
3. **Click a Parcel**: Click on any parcel to see detailed comparison
4. **Review Comparison**: The side panel shows current vs future zoning

## Importing Data

### From ArcGIS REST API

Use the API endpoint to import parcel data:

```bash
curl -X POST http://localhost:3000/api/parcels/import/arcgis \
  -H "Content-Type: application/json" \
  -d '{
    "arcgis_url": "https://services.arcgis.com/.../FeatureServer/0/query",
    "municipality_id": "your-municipality-id"
  }'
```

### Adding a Municipality

First, add your municipality:

```bash
curl -X POST http://localhost:3000/api/municipalities \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Example City",
    "county": "Example County",
    "state": "CA",
    "arcgis_url": "https://services.arcgis.com/.../FeatureServer/0/query"
  }'
```

## Common ArcGIS Data Sources

Many municipalities publish parcel data via ArcGIS. Examples:

- Search for "[your city] open data portal"
- Look for "Parcels" or "Tax Parcels" datasets
- Copy the REST API URL (usually ends with `/FeatureServer/0`)

## Troubleshooting

**Database connection errors:**
- Ensure Docker is running: `docker ps`
- Check database logs: `docker logs zoning-db`

**Map not loading:**
- Verify your Mapbox token is set in `client/.env`
- Check browser console for errors

**No parcels found:**
- Import data using the ArcGIS endpoint
- Verify municipality exists in database

## Next Steps

- Import real parcel data from your municipality
- Customize zoning codes to match your area
- Add additional fields for permits, restrictions, etc.
