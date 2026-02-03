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
  created_at: Date;
  updated_at: Date;
}

export interface Municipality {
  id: string;
  name: string;
  county: string;
  state: string;
  arcgis_url?: string;
  bounds?: GeoJSON.Polygon;
  created_at: Date;
}

export interface ParcelComparisonResult {
  parcel: Parcel;
  zoning_matches: boolean;
  potential_issues?: string[];
}
