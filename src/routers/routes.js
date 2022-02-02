import { Router } from 'express';
import * as usersController from '../controllers/usersController.js';

const routes = new Router();

routes.get('/health', async (req, res) => {
  res.sendStatus(200);
});

routes.post('/sign-up', usersController.insert);

export default routes;
