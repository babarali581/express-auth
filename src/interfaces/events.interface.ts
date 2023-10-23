export interface Event {
  
    name : string,
    details : string,
    date : string,
    categoryId : boolean
  }
  
  export interface Events extends Array<Event>{}
  