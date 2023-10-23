import { Router } from 'express';
import BookingControllers from '@controllers/booking.controller';
import { Routes } from '@interfaces/routes.interface';
import authMiddleware from '@middlewares/auth.middleware';

class DashboardRoute implements Routes {
  public path = '/booking';
  public router = Router();
  public bookingControllers = new BookingControllers();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.get(`${this.path}/listById`,authMiddleware, this.bookingControllers.listBookingById);
    this.router.get(`${this.path}/list`,authMiddleware, this.bookingControllers.listBooking);
    this.router.post(`${this.path}/create`,authMiddleware, this.bookingControllers.createBooking); 
    this.router.put(`${this.path}/update/:bookingId`,authMiddleware, this.bookingControllers.updateBooking);
    this.router.delete(`${this.path}/delete/:bookingId`,authMiddleware, this.bookingControllers.deleteBooking);

  
  }
}

export default DashboardRoute;
