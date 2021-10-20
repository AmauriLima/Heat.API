import 'dotenv/config';
import { Router } from 'express';
import { authRoutes } from './authRoutes';

const routes = Router();

routes.use('/auth', authRoutes);

export { routes };