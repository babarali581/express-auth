import { model, Schema, Document } from 'mongoose';
import { Event } from '@interfaces/events.interface';

const eventSchema: Schema = new Schema({
  uid: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  details: {
    type: String,
    required: true,
    unique: true,
  },
  date: {
    type: Date,
    required: true,
  },
  categoryId: {
    type: String,
    required: true,
  },
});

const eventModel = model<Event & Document>('Event', eventSchema);

export default eventModel;
