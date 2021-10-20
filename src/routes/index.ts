import { Router } from 'express';
import { ensureAuthenticated } from '../middleware/ensureAuthenticated';
import { authRoutes } from './authRoutes';
import { messageRoutes } from './messageRoutes';

const routes = Router();

routes.use('/auth', authRoutes);
routes.use('/message', ensureAuthenticated, messageRoutes);

export { routes };
