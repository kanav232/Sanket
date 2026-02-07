import { Router } from 'express';
import { ingestData } from './ingest-controller';

export const ingestRouter = Router();

ingestRouter.post('/', ingestData);