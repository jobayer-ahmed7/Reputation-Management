import { Router } from 'express';
import authRouter from '../modules/auth/auth.route';
import { ServiceRoutes } from '../modules/service/service.route';
import { OrderRoutes } from '../modules/order/order.route';
import { ContactRouter } from '../modules/contact/contact.route';

const router = Router();

const moduleRoutes = [
  {
    path: '/auth',
    route: authRouter,
  },
  {
    path: '/services',
    route: ServiceRoutes,
  },
  {
    path: '/orders',
    route: OrderRoutes,
  },
  {
    path: '/contact',
    route: ContactRouter,
  },
];

moduleRoutes.forEach((route) => {
  router.use(route.path, route.route);
});

export default router;
