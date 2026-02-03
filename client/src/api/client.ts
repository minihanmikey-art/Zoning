import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000';

export const api = axios.create({
  baseURL: `${API_URL}/api`,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const parcelApi = {
  search: (query: string, municipalityId?: string) =>
    api.get('/parcels/search', { params: { query, municipality_id: municipalityId } }),

  getById: (id: string) =>
    api.get(`/parcels/${id}`),

  compare: (id: string) =>
    api.get(`/parcels/${id}/compare`),

  importFromArcGIS: (arcgisUrl: string, municipalityId: string) =>
    api.post('/parcels/import/arcgis', { arcgis_url: arcgisUrl, municipality_id: municipalityId }),
};

export const municipalityApi = {
  getAll: () =>
    api.get('/municipalities'),

  getById: (id: string) =>
    api.get(`/municipalities/${id}`),

  create: (data: any) =>
    api.post('/municipalities', data),
};
