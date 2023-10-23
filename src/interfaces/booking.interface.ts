export interface Booking {
    name : string,
    phone : string,
    eventId : boolean,
    numberOfparticipants : boolean
  }
  
  export interface Booking extends Array<Booking>{}
  