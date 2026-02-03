import { Router } from 'express';
import * as parcelController from '../controllers/parcel.controller';

const router = Router();

// Search parcels
router.get('/search', parcelController.searchParcels);

// Get parcel by ID
router.get('/:id', parcelController.getParcelById);

// Compare parcel zoning vs future land use
router.get('/:id/compare', parcelController.compareParcel);

// Import parcels from ArcGIS
router.post('/import/arcgis', parcelController.importFromArcGIS);

// Upload parcel data file
router.post('/import/file', parcelController.uploadParcelFile);

export default router;
