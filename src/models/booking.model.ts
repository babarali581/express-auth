import { model, Schema, Document } from 'mongoose';
import { Booking } from '@interfaces/booking.interface';

const bookingSchema: Schema = new Schema({
  name: {
    type: String,
    required: true,
  },
  phone: {
    type: String,
    required: true,
    unique: true,
  },
  eventId: {
    type: Number,
    required: true,
  },
  numberOfparticipants: {
    type: Number,
    required: true,
  },
});

const bookingModel = model<Booking & Document>('Booking', bookingSchema);

export default bookingModel;
