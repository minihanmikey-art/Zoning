# Railway Deployment Guide

This guide will help you deploy the Zoning Land Use Planner backend to Railway.

## Prerequisites

- GitHub account
- Railway account (sign up at https://railway.app)
- Mapbox account and access token

## Step 1: Push Code to GitHub

If you haven't already pushed to GitHub:

```bash
cd /home/user/Zoning

# If you don't have a GitHub remote yet
git remote add github https://github.com/YOUR_USERNAME/Zoning.git

# Push your code
git push github claude/zoning-land-use-planner-BiyCN:main
```

## Step 2: Sign Up for Railway

1. Go to https://railway.app
2. Click "Login" and sign in with your GitHub account
3. Authorize Railway to access your GitHub repositories

## Step 3: Create a New Project

1. Click "New Project" button
2. Select "Deploy from GitHub repo"
3. Choose your `Zoning` repository
4. Railway will automatically detect the Node.js backend

## Step 4: Add PostgreSQL Database

1. In your Railway project dashboard, click "+ New"
2. Select "Database" → "Add PostgreSQL"
3. Railway will automatically create a PostgreSQL database
4. The database connection will be automatically configured via environment variables

## Step 5: Enable PostGIS Extension

1. Click on your PostgreSQL service in Railway
2. Go to "Connect" tab and copy the connection URL
3. Use a PostgreSQL client (like psql or pgAdmin) to connect
4. Run: `CREATE EXTENSION IF NOT EXISTS postgis;`

**Or** let the migration script handle it automatically (it's included in the startup command).

## Step 6: Configure Environment Variables

Railway automatically sets `DATABASE_URL` for PostgreSQL. You may want to add:

1. Click on your service (not the database)
2. Go to "Variables" tab
3. Add any custom variables if needed:
   - `PORT` (Railway sets this automatically)
   - `CLIENT_URL` (optional, for CORS)

## Step 7: Deploy

1. Railway will automatically deploy your app
2. Wait for the build to complete (2-3 minutes)
3. Once deployed, click on your service
4. Go to "Settings" tab
5. Under "Networking", click "Generate Domain"
6. Copy your Railway URL (e.g., `https://your-app-name.railway.app`)

## Step 8: Update Your HTML File

1. Open `index.html` in a text editor
2. Update line 78 with your Mapbox token:
   ```javascript
   const MAPBOX_TOKEN = 'your_actual_mapbox_token';
   ```
3. Update line 79 with your Railway API URL:
   ```javascript
   const API_URL = 'https://your-app-name.railway.app/api';
   ```
4. Save the file

## Step 9: Test Your App

1. Open `index.html` in your web browser
2. The app should now connect to your Railway backend
3. Try searching for parcels and interacting with the map

## Step 10: Import Parcel Data

To add parcel data from a municipality's ArcGIS server:

1. Use the API endpoint: `POST /api/municipalities`
2. Provide the municipality details and ArcGIS REST service URL
3. Use the import endpoint to fetch parcel data

See the main README.md for API documentation.

---

## Troubleshooting

### Build Fails
- Check the Railway logs for errors
- Ensure `server/package.json` has the correct scripts
- Verify `railway.json` configuration

### Database Connection Issues
- Ensure PostGIS extension is enabled
- Check that `DATABASE_URL` environment variable is set
- Verify the migration script ran successfully

### CORS Errors
- The backend is configured to allow all origins
- If you need to restrict, update `server/src/index.ts`

### App Not Loading
- Open browser developer console (F12)
- Check for JavaScript errors
- Verify the API_URL in index.html is correct
- Test the API health endpoint: `https://your-app.railway.app/health`

---

## Cost

Railway offers:
- **$5 free credits per month** (for hobby tier)
- **500 hours free execution time**
- This should be enough for development and small-scale usage

If you exceed the free tier, Railway will charge based on usage.

---

## Alternative: Render Deployment

If you prefer Render (free tier):

1. Go to https://render.com
2. Sign up with GitHub
3. Create "New Web Service"
4. Connect your GitHub repo
5. Select the `server` directory as root
6. Build command: `npm install && npm run build`
7. Start command: `npm start`
8. Add "PostgreSQL" from the dashboard
9. Follow similar steps as Railway

---

## Support

For Railway support:
- Documentation: https://docs.railway.app
- Discord: https://discord.gg/railway

For app issues:
- Check the main README.md
- Review server logs in Railway dashboard
