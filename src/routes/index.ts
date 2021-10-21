import { Router } from 'express';
import { ensureAuthenticated } from '../middleware/ensureAuthenticated';
import { authRoutes } from './authRoutes';
import { messageRoutes } from './messageRoutes';
import { profileRoutes } from './profileRoutes';

const routes = Router();

routes.use('/auth', authRoutes);
routes.use('/profile', ensureAuthenticated, profileRoutes);
routes.use('/message', messageRoutes);

export { routes };
