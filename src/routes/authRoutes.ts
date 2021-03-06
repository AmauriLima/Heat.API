import { Router } from 'express';
import AuthController from '../app/controllers/AuthController';

const authRoutes = Router();

authRoutes.get('/github', AuthController.signInWithGithub);
authRoutes.get('/signin/callback', AuthController.signInCallback);
authRoutes.post('/authenticate', AuthController.authenticate);

export { authRoutes };
