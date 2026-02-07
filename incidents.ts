import { Router } from 'express';
import { getIncidents, getIncident, updateIncident, deleteIncident } from './incident-controller';

export const incidentRouter = Router();

incidentRouter.get('/', getIncidents);
incidentRouter.get('/:id', getIncident);
incidentRouter.put('/:id', updateIncident);
incidentRouter.delete('/:id', deleteIncident);