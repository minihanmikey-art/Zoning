import pool from '../config/database';

async function migrate() {
  try {
    console.log('🔄 Running database migrations...');

    // Enable PostGIS extension
    await pool.query('CREATE EXTENSION IF NOT EXISTS postgis;');
    console.log('✅ PostGIS extension enabled');

    // Create municipalities table
    await pool.query(`
      CREATE TABLE IF NOT EXISTS municipalities (
        id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
        name VARCHAR(255) NOT NULL,
        county VARCHAR(255) NOT NULL,
        state VARCHAR(2) NOT NULL,
        arcgis_url TEXT,
        bounds GEOMETRY(Polygon, 4326),
        created_at TIMESTAMP DEFAULT NOW()
      );
    `);
    console.log('✅ Municipalities table created');

    // Create parcels table
    await pool.query(`
      CREATE TABLE IF NOT EXISTS parcels (
        id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
        parcel_id VARCHAR(255) NOT NULL,
        address TEXT,
        municipality_id UUID REFERENCES municipalities(id),
        current_zoning VARCHAR(100),
        future_land_use VARCHAR(100),
        geometry GEOMETRY(Geometry, 4326),
        acreage DECIMAL(10, 2),
        owner TEXT,
        created_at TIMESTAMP DEFAULT NOW(),
        updated_at TIMESTAMP DEFAULT NOW(),
        UNIQUE(parcel_id, municipality_id)
      );
    `);
    console.log('✅ Parcels table created');

    // Create spatial index
    await pool.query(`
      CREATE INDEX IF NOT EXISTS parcels_geometry_idx
      ON parcels USING GIST (geometry);
    `);
    console.log('✅ Spatial index created');

    // Create indexes
    await pool.query(`
      CREATE INDEX IF NOT EXISTS parcels_parcel_id_idx ON parcels(parcel_id);
      CREATE INDEX IF NOT EXISTS parcels_municipality_id_idx ON parcels(municipality_id);
      CREATE INDEX IF NOT EXISTS parcels_address_idx ON parcels(address);
    `);
    console.log('✅ Indexes created');

    console.log('🎉 Migration completed successfully!');
    process.exit(0);
  } catch (error) {
    console.error('❌ Migration failed:', error);
    process.exit(1);
  }
}

migrate();
