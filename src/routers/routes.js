import { Router } from 'express';
import * as usersController from '../controllers/usersController.js';
import * as sessionsController from '../controllers/sessionsController.js';

const routes = new Router();

routes.get('/health', async (req, res) => {
  res.sendStatus(200);
});

routes.post('/sign-up', usersController.insert);
routes.post('/log-in', sessionsController.insert);

export default routes;
