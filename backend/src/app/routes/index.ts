import { Router } from "express";
import { ServiceRoutes } from "../modules/service/service.route";
import { TestimonialRoutes } from "../modules/testimonial/testimonial.route";
import authRouter from "../modules/auth/auth.route";
import { UserRoutes } from "../modules/user/user.route";
import { OrderRoutes } from "../modules/order/order.route";

const router = Router();

const moduleRoutes = [
  {
    path: "/auth",
    route: authRouter,
  },
  {
    path: "/users",
    route: UserRoutes, 
  },
  {
    path: "/services",
    route: ServiceRoutes,
  },
  {
    path: "/testimonials",
    route: TestimonialRoutes,
  },
  {
    path: "/orders",
    route: OrderRoutes,
  },
];

moduleRoutes.forEach((route) => {
  router.use(route.path, route.route);
});

export default router;
