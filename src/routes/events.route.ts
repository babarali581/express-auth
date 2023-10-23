import { Router } from 'express';
import EventControllers from '@controllers/events.controller';
import { CreateEventDto } from '@dtos/events.dto';
import { Routes } from '@interfaces/routes.interface';
import authValidationMiddleware from '@middlewares/auth.validate.middleware';
import authMiddleware from '@middlewares/auth.middleware';

class EventsRoute implements Routes {
  public path = '/events';
  public router = Router();
  public eventsController = new EventControllers();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.get(`${this.path}/list`,authMiddleware, this.eventsController.listEvents);
    this.router.get(`${this.path}/:eventId`,authMiddleware, this.eventsController.getEventById); 
    this.router.put(`${this.path}/update/:eventId`, authMiddleware , this.eventsController.updateEvent); 
    this.router.delete(`${this.path}/delete/:eventId`, authMiddleware, this.eventsController.deleteEvent); 
    this.router.post(`${this.path}/create`, authMiddleware , this.eventsController.createEvents);
  }
}

export default EventsRoute;
