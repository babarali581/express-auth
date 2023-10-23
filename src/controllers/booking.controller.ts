import { NextFunction, Request, Response } from 'express';
import { CreateBookingDto } from '@dtos/booking.dto';
import userBooking from '@services/booking.service';

class BookingController {
  public bookingService = new userBooking();
  public listBooking = async (req: Request, res: Response, next: NextFunction) => {
    const {page , limit} = req.query
    try {
      const userId = req.user._id;
      const getBooking: Booking[] = await this.bookingService.listBooking(userId);
     
      res.status(200).json({ data: getBooking, message: 'findAll' });
    } catch (error) {
      console.log('error: ', error);
      next(error);
    }
  };

  public listBookingById = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const bookingId = req.query.bookingId
      const getBooking: Booking[] = await this.bookingService.listBooking(bookingId);
      res.status(200).json({ data: getBooking, message: 'findAll' });
    } catch (error) {
      console.log('error: ', error);
      next(error);
    }
  };

  public createBooking = async (req: Request, res: Response, next: NextFunction) => {
    try {
        console.log("booking controllers created");
      const booking: bookingService = req.body;

      booking.uid = "abcdefghijklmnopqrstuvwxyz";
      const createEventData: CreateBookingDto = await this.bookingService.createBooking(booking);
      res.status(201).json({ data: createEventData, message: 'created' });
    } catch (error) {
      console.log('error: ', error);
      next(error);
    }
  };
  public updateBooking = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const bookingId = req.params.bookingId;
      const updatedData = req.body;
      const updatedBooking = await this.bookingService.updateBooking(bookingId, updatedData);
      res.status(200).json({ data: updatedBooking, message: 'Booking updated' });
    } catch (error) {
      console.log('error: ', error);
      next(error);
    }
  };
  // In your booking.controller.ts file

// ...

public deleteBooking = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const bookingId = req.params.bookingId;
    console.log('bookingId: ', bookingId);

    await this.bookingService.deleteBooking(bookingId);

    res.status(204).json(); // No content
  } catch (error) {
    console.log('error: ', error);
    next(error);
  }
};

}

export default BookingController;
