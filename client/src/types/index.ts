export interface Parcel {
  id: string;
  parcel_id: string;
  address: string;
  municipality_id: string;
  current_zoning: string;
  future_land_use: string;
  geometry: GeoJSON.Geometry;
  acreage?: number;
  owner?: string;
  created_at: string;
  updated_at: string;
}

export interface Municipality {
  id: string;
  name: string;
  county: string;
  state: string;
  arcgis_url?: string;
  bounds?: GeoJSON.Polygon;
  created_at: string;
}

export interface ParcelComparisonResult {
  parcel: Parcel;
  zoning_matches: boolean;
  potential_issues?: string[];
}
