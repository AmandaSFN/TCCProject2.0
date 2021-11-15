import {Router} from 'express'
import { iaRoutes } from './ia.routes';
import { plantationRoute } from './plantation.routes';

const routes = Router();



routes.use(plantationRoute)
routes.use(iaRoutes)

export default routes