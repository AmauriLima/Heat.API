import { Router } from 'express';
import MessageController from '../app/controllers/MessageController';
import { ensureAuthenticated } from '../middleware/ensureAuthenticated';

const messageRoutes = Router();

messageRoutes.post('/', ensureAuthenticated, MessageController.store);
messageRoutes.get('/last3', MessageController.showLastThreeMessages);

export { messageRoutes };
