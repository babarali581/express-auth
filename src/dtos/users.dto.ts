import { IsEmail, IsString } from 'class-validator';

export class CreateUserDto {

  @IsString()
  public userName: string;

  @IsEmail()
  public email: string;

  @IsString()
  public password: string;
}


export class LoginUserDto {


  @IsEmail()
  public email: string;

  @IsString()
  public password: string;

}

