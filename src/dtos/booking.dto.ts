import { IsBoolean , IsDate, IsEmail, IsInt, IsString } from 'class-validator';

export class CreateBookingDto {

  @IsString()
  public name: string;

  @IsString()
  public phone: string;

  @IsInt()
  public eventId: number;

  @IsInt()
  public NumberOfParticipants: string;
  uid: string;
  
}



