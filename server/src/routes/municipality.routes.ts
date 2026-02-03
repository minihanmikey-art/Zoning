import { Router } from 'express';
import * as municipalityController from '../controllers/municipality.controller';

const router = Router();

// Get all municipalities
router.get('/', municipalityController.getAllMunicipalities);

// Get municipality by ID
router.get('/:id', municipalityController.getMunicipalityById);

// Add new municipality
router.post('/', municipalityController.createMunicipality);

export default router;
