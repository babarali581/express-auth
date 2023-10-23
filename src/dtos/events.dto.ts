import { IsBoolean , IsDate, IsEmail, IsInt, IsString } from 'class-validator';

export class CreateEventDto {

  @IsString()
  public name: string;

  @IsString()
  public details: string;

  @IsString()
  public date: string;

  @IsInt()
  public categoryId: string;
  uid: string;
  
}
export class UpdateEventDto {

  @IsString()
  public name: string;

  @IsString()
  public details: string;

  @IsDate()
  public date: Date;

  @IsInt()
  public categoryId: number;
}

export class LoginUserDto {


  @IsEmail()
  public email: string;

  @IsString()
  public password: string;

}

function IsData(): (target: CreateEventDto, propertyKey: "date") => void {
  throw new Error('Function not implemented.');
}

