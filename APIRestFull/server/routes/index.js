import { Router } from "express";
import trooperRoutes from "./trooper.js";
import trooperRoutes2 from "./trooper2.js";

const routes = new Router();
routes.use('/troopers', trooperRoutes);
routes.use('/troopers2', trooperRoutes2);

export default routes;