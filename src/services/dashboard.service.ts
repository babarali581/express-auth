import { hash } from 'bcrypt';
import { CreateEventDto } from '@dtos/events.dto';
import { HttpException } from '@exceptions/HttpException';
import { Event } from '@interfaces/events.interface';
import eventModel from '@models/events.model';
import userModel from '@models/users.model';
import bookingModel from '@models/booking.model';
import { isEmpty } from '@utils/util';


class DashboardService {
  public events = eventModel;
  public users = userModel;
  public bookings = bookingModel;


  public async listDashboardItems() {
    const [events, users, bookings] = await Promise.all([
      this.events.countDocuments().exec(),
      this.users.countDocuments().exec(),
      this.bookings.countDocuments().exec(),
      ]);
  
  let data = [ {key:"events" , value:events ,label: "Events" }, {key:"users" , value:users , label: "Users"}, {key:"booking",  value:bookings , label:"Booking"} ]
  

    // const findEvent: Event = await this.events.find({ uid });
    // if (!findEvent) throw new HttpException(409, "Event doesn't exist");
   return data;
  }



}

export default DashboardService;
