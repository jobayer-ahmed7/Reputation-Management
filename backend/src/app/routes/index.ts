import { Router } from "express";
import { ServiceRoutes } from "../module/service/service.route";

const router = Router();

const moduleRoutes = [
  {
    path: "/service",
    route: ServiceRoutes,
  },
];

moduleRoutes.forEach((route) => {
  // console.log('📦 Registering route:', route.path);
  router.use(route.path, route.route);
});

export default router;
