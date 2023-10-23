import { NextFunction, Request, Response } from 'express';
import { CreateEventDto ,UpdateEventDto } from '@dtos/events.dto';
import userEvent from '@services/events.service';

class EventsController {
  public eventService = new userEvent();

  public listEvents = async (req: Request, res: Response, next: NextFunction) => {
    const {page , limit} = req.query
    try {
      const userId = req.user._id;
      console.log('userId: ', userId);
    

      const getEvents: Event[] = await this.eventService.listEvent(userId , page , limit);
     
      res.status(200).json({ data: getEvents, message: 'findAll' });
    } catch (error) {
      console.log('error: ', error);
      next(error);
    }
  };



  public createEvents = async (req: Request, res: Response, next: NextFunction) => {
    try {
        console.log("event controllers created");
      const events: CreateEventDto = req.body;
      console.log('events: ', events);
      events.uid = req.user._id;
      const createEventData: userEvent = await this.eventService.createEvent(events);
      res.status(201).json({ data: createEventData, message: 'created' });
    } catch (error) {
      console.log('error: ', error);
      next(error);
    }
  };

  public getEventById = async (req: Request, res: Response, next: NextFunction) => {
    try {
      console.log("inside getEventById");
      const eventId = req.params.eventId;
      const getEvent: Event = await this.eventService.getEventById(eventId);
      res.status(200).json({ data: getEvent, message: 'findEventById' });
    } catch (error) {
      console.log('error: ', error);
      next(error);
    }
  };
  
  public updateEvent = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const eventId = req.params.eventId;
      const updatedData: UpdateEventDto = req.body;
      const updatedEvent: Event = await this.eventService.updateEvent(eventId, updatedData);
      res.status(200).json({ data: updatedEvent, message: 'eventUpdated' });
    } catch (error) {
      console.log('error: ', error);
      next(error);
    }
  };
  
  public deleteEvent = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const eventId = req.params.eventId;
      await this.eventService.deleteEvent(eventId);
      res.status(200).json({ message: 'eventDeleted' });
    } catch (error) {
      console.log('error: ', error);
      next(error);
    }
  };
}

export default EventsController;
