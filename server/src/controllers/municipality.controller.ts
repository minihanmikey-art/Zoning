import { Request, Response } from 'express';
import * as municipalityService from '../services/municipality.service';

export const getAllMunicipalities = async (req: Request, res: Response) => {
  try {
    const municipalities = await municipalityService.getAllMunicipalities();
    res.json(municipalities);
  } catch (error) {
    console.error('Error getting municipalities:', error);
    res.status(500).json({ error: 'Failed to get municipalities' });
  }
};

export const getMunicipalityById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const municipality = await municipalityService.getMunicipalityById(id);

    if (!municipality) {
      return res.status(404).json({ error: 'Municipality not found' });
    }

    res.json(municipality);
  } catch (error) {
    console.error('Error getting municipality:', error);
    res.status(500).json({ error: 'Failed to get municipality' });
  }
};

export const createMunicipality = async (req: Request, res: Response) => {
  try {
    const municipalityData = req.body;
    const municipality = await municipalityService.createMunicipality(municipalityData);
    res.status(201).json(municipality);
  } catch (error) {
    console.error('Error creating municipality:', error);
    res.status(500).json({ error: 'Failed to create municipality' });
  }
};
