import { hash } from 'bcrypt';
import { CreateBookingDto } from '@dtos/booking.dto';

import { HttpException } from '@exceptions/HttpException';
import { Event } from '@interfaces/events.interface';
import bookingModel from '@models/booking.model';
import { isEmpty } from '@utils/util';


class EventService {
  public booking = bookingModel;

  public async listBooking(uid: string): Promise<Event> {
    const findBooking: Event = await this.booking.find();
    if (!findBooking) throw new HttpException(409, "Event doesn't exist");
    return findBooking;
  }

  public async listBookingById(bookingId: string): Promise<Event> {
    const objectId = new require('mongodb').ObjectID(bookingId);
    const findBooking: Event = await this.booking.findOne({ _id: objectId });
    if (!findBooking) throw new HttpException(409, "Booking doesn't exist");
    return findBooking;
  }
  public async createBooking(bookingData: CreateBookingDto): Promise<Event> {
    console.log('bookingData: ', bookingData);
    console.log("inside booking service");
    if (isEmpty(bookingData)) throw new HttpException(400, "eventData is empty");

    const createBookingData: Event = await this.booking.create({ ...bookingData });

    return createBookingData;
     
  }
  public async updateBooking(bookingId: string, updatedData: any): Promise<Event> {
    console.log('updatedData: ', updatedData);
    console.log('bookingId: ', bookingId);
    
   const updatedBooking = await this.booking.findByIdAndUpdate(bookingId, updatedData, { new: true });
  
    if (!updatedBooking) throw new HttpException(404, 'Booking not found');
    return updatedBooking;
  }
 
public async deleteBooking(bookingId: string): Promise<void> {
  console.log('bookingId in del ', bookingId);

   await this.booking.findByIdAndDelete(bookingId);
}


}

export default EventService;
