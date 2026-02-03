import pool from '../config/database';
import { Municipality } from '../types';

export const getAllMunicipalities = async (): Promise<Municipality[]> => {
  const result = await pool.query('SELECT * FROM municipalities ORDER BY name');
  return result.rows;
};

export const getMunicipalityById = async (id: string): Promise<Municipality | null> => {
  const result = await pool.query('SELECT * FROM municipalities WHERE id = $1', [id]);
  return result.rows[0] || null;
};

export const createMunicipality = async (
  data: Partial<Municipality>
): Promise<Municipality> => {
  const result = await pool.query(
    `INSERT INTO municipalities (name, county, state, arcgis_url, bounds)
     VALUES ($1, $2, $3, $4, $5)
     RETURNING *`,
    [data.name, data.county, data.state, data.arcgis_url, data.bounds]
  );
  return result.rows[0];
};
