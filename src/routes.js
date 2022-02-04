import { Router } from 'express';
import * as usersController from './controllers/usersController.js';
import * as sessionsController from './controllers/sessionsController.js';
import * as walletsController from './controllers/walletsController.js';
import validateToken from './middlewares/tokenValidator.js';

const routes = new Router();

routes.get('/health', async (req, res) => {
  res.sendStatus(200);
});

routes.post('/sign-up', usersController.insert);
routes.post('/log-in', sessionsController.upsert);
routes.use(validateToken);
routes.delete('/logout', sessionsController.remove);
routes.post('/wallet', walletsController.insertMovimentation);
routes.get('/wallet', walletsController.find);
routes.delete('/wallet/:id', walletsController.deleteMovimentation);
routes.put('/wallet/:id', walletsController.updateMovimentation);

export default routes;
