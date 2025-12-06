import { Router } from "express";
import { ServiceRoutes } from "../modules/service/service.route";
import { TestimonialRoutes } from "../modules/testimonial/testimonial.route";

const router = Router();

const moduleRoutes = [
  {
    path: "/service",
    route: ServiceRoutes,
  },
  {
    path: "/testimonial",
    route: TestimonialRoutes,
  },
];

moduleRoutes.forEach((route) => {
  router.use(route.path, route.route);
});

export default router;
