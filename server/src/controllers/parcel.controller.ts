import { Request, Response } from 'express';
import * as parcelService from '../services/parcel.service';

export const searchParcels = async (req: Request, res: Response) => {
  try {
    const { query, municipality_id } = req.query;
    const parcels = await parcelService.searchParcels(
      query as string,
      municipality_id as string
    );
    res.json(parcels);
  } catch (error) {
    console.error('Error searching parcels:', error);
    res.status(500).json({ error: 'Failed to search parcels' });
  }
};

export const getParcelById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const parcel = await parcelService.getParcelById(id);

    if (!parcel) {
      return res.status(404).json({ error: 'Parcel not found' });
    }

    res.json(parcel);
  } catch (error) {
    console.error('Error getting parcel:', error);
    res.status(500).json({ error: 'Failed to get parcel' });
  }
};

export const compareParcel = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const comparison = await parcelService.compareParcelZoning(id);

    if (!comparison) {
      return res.status(404).json({ error: 'Parcel not found' });
    }

    res.json(comparison);
  } catch (error) {
    console.error('Error comparing parcel:', error);
    res.status(500).json({ error: 'Failed to compare parcel' });
  }
};

export const importFromArcGIS = async (req: Request, res: Response) => {
  try {
    const { arcgis_url, municipality_id } = req.body;
    const result = await parcelService.importFromArcGIS(arcgis_url, municipality_id);
    res.json(result);
  } catch (error) {
    console.error('Error importing from ArcGIS:', error);
    res.status(500).json({ error: 'Failed to import from ArcGIS' });
  }
};

export const uploadParcelFile = async (req: Request, res: Response) => {
  try {
    // TODO: Implement file upload with multer
    res.status(501).json({ error: 'File upload not yet implemented' });
  } catch (error) {
    console.error('Error uploading file:', error);
    res.status(500).json({ error: 'Failed to upload file' });
  }
};
