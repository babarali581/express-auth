import { Router } from 'express';
import DashboardControllers from '@controllers/dashboard.controller';
import { CreateEventDto } from '@dtos/events.dto';
import { Routes } from '@interfaces/routes.interface';
import authMiddleware from '@middlewares/auth.middleware';

class DashboardRoute implements Routes {
  public path = '/dashboard';
  public router = Router();
  public dashboardControllers = new DashboardControllers();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.get(`${this.path}/list`,authMiddleware, this.dashboardControllers.listDashboardItems);
  }
}

export default DashboardRoute;
