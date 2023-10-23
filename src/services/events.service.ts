import { hash } from 'bcrypt';
import { CreateEventDto } from '@dtos/events.dto';
import { HttpException } from '@exceptions/HttpException';
import { Event } from '@interfaces/events.interface';
import eventModel from '@models/events.model';
import { isEmpty } from '@utils/util';


class EventService {
  public events = eventModel;

  public async listEvent(uid: string, offset: number = 0, limit: number = 10): Promise<Event[]> {
    const findEvent: Event = await this.events.find().skip(offset)
    .limit(limit)
    .exec();
    if (!findEvent) throw new HttpException(409, "Event doesn't exist");
    return findEvent;
  }

  public async createEvent(eventData: CreateEventDto): Promise<Event> {
    if (isEmpty(eventData)) throw new HttpException(400, "eventData is empty");

    const createEventData: Event = await this.events.create({ ...eventData });

    return createEventData;
     
  }
  // Inside the EventService class

public async getEventById(eventId: string): Promise<Event> {
  const findEvent: Event = await this.events.findById(eventId);
  if (!findEvent) throw new HttpException(404, 'Event not found');
  return findEvent;
}

public async updateEvent(eventId: string, eventData: UpdateEventDto): Promise<Event> {
  console.log('eventData update: ', eventData);
  const updatedEvent: Event = await this.events.findByIdAndUpdate(eventId, eventData, { new: true });
  if (!updatedEvent) throw new HttpException(404, 'Event not found');
  return updatedEvent;
}

public async deleteEvent(eventId: string): Promise<void> {
  const deletedEvent = await this.events.findByIdAndDelete(eventId);
  if (!deletedEvent) throw new HttpException(404, 'Event not found');
}


}

export default EventService;
