import pool from '../config/database';
import axios from 'axios';
import { Parcel, ParcelComparisonResult } from '../types';

export const searchParcels = async (
  query: string,
  municipalityId?: string
): Promise<Parcel[]> => {
  let sql = `
    SELECT * FROM parcels
    WHERE (parcel_id ILIKE $1 OR address ILIKE $1)
  `;
  const params: any[] = [`%${query}%`];

  if (municipalityId) {
    sql += ` AND municipality_id = $2`;
    params.push(municipalityId);
  }

  sql += ` LIMIT 50`;

  const result = await pool.query(sql, params);
  return result.rows;
};

export const getParcelById = async (id: string): Promise<Parcel | null> => {
  const result = await pool.query('SELECT * FROM parcels WHERE id = $1', [id]);
  return result.rows[0] || null;
};

export const compareParcelZoning = async (
  id: string
): Promise<ParcelComparisonResult | null> => {
  const parcel = await getParcelById(id);

  if (!parcel) {
    return null;
  }

  const zoning_matches = parcel.current_zoning === parcel.future_land_use;
  const potential_issues: string[] = [];

  if (!zoning_matches) {
    potential_issues.push(
      `Zoning change from "${parcel.current_zoning}" to "${parcel.future_land_use}" may be required`
    );
  }

  return {
    parcel,
    zoning_matches,
    potential_issues: potential_issues.length > 0 ? potential_issues : undefined,
  };
};

export const importFromArcGIS = async (
  arcgisUrl: string,
  municipalityId: string
): Promise<{ imported: number; failed: number }> => {
  try {
    // Query ArcGIS REST API
    const response = await axios.get(arcgisUrl, {
      params: {
        f: 'geojson',
        outFields: '*',
        where: '1=1',
      },
    });

    const features = response.data.features;
    let imported = 0;
    let failed = 0;

    for (const feature of features) {
      try {
        const { properties, geometry } = feature;

        await pool.query(
          `INSERT INTO parcels (
            parcel_id, address, municipality_id,
            current_zoning, future_land_use, geometry, acreage, owner
          ) VALUES ($1, $2, $3, $4, $5, ST_GeomFromGeoJSON($6), $7, $8)
          ON CONFLICT (parcel_id, municipality_id) DO UPDATE SET
            address = EXCLUDED.address,
            current_zoning = EXCLUDED.current_zoning,
            future_land_use = EXCLUDED.future_land_use,
            geometry = EXCLUDED.geometry,
            updated_at = NOW()`,
          [
            properties.parcel_id || properties.PARCELID || properties.APN,
            properties.address || properties.ADDRESS || properties.SITUS,
            municipalityId,
            properties.zoning || properties.ZONING || properties.ZONE_CODE,
            properties.future_land_use || properties.FLU || properties.FUTURE_LU,
            JSON.stringify(geometry),
            properties.acreage || properties.ACRES || null,
            properties.owner || properties.OWNER || null,
          ]
        );
        imported++;
      } catch (err) {
        console.error('Failed to import feature:', err);
        failed++;
      }
    }

    return { imported, failed };
  } catch (error) {
    console.error('ArcGIS import error:', error);
    throw new Error('Failed to fetch data from ArcGIS');
  }
};
