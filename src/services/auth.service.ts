import { hash, compare } from 'bcrypt';
import { sign } from 'jsonwebtoken';
import { SECRET_KEY } from '@config';
import { CreateUserDto } from '@/dtos/events.dto';
import { HttpException } from '@exceptions/HttpException';
import { DataStoredInToken, TokenData } from '@interfaces/auth.interface';
import { User ,Users } from '@interfaces/users.interface';
import userModel from '@models/users.model';
import { isEmpty } from '@utils/util';

class AuthService {
  public users = userModel;

  public async signup(userData: CreateUserDto): Promise<User> {
    if (isEmpty(userData)) throw new HttpException(400, "userData is empty");
    const findUser: User = await this.users.findOne({ email: userData.email });
    if (findUser) throw new HttpException(409, `This email ${userData.email} already exists`);

    const hashedPassword = await hash(userData.password, 10);
    const createUserData: User = await this.users.create({ ...userData, password: hashedPassword });

    return createUserData;
  }

  public async login(userData: CreateUserDto): Promise<{ token: string; findUser: User }> {
    if (isEmpty(userData)) throw new HttpException(400, "userData is empty");

    const findUser: User = await this.users.findOne({ email: userData.email });
    if (!findUser) throw new HttpException(409, `This email ${userData.email} was not found`);

    const isPasswordMatching: boolean = await compare(userData.password, findUser.password);
    if (!isPasswordMatching) throw new HttpException(409, "Password is not matching");

    const token = this.createToken(findUser);
    console.log('token: ', token);
    // const cookie = this.createCookie(tokenData);

    return {token, findUser };
  }

  public async logout(userData: User): Promise<User> {
    if (isEmpty(userData)) throw new HttpException(400, "userData is empty");

    const findUser: User = await this.users.findOne({ email: userData.email, password: userData.password });
    if (!findUser) throw new HttpException(409, `This email ${userData.email} was not found`);

    return findUser;
  }

  public async loginHistory(userData: Users): Promise<Users> {
    if (isEmpty(userData)) throw new HttpException(400, "userData is empty");

    const users: Users = await this.users.find();
    //if (!users) throw new HttpException(409, `This email ${userData.email} was not found`);

    return users;
  }

  public createToken(user: User): TokenData {
    const dataStoredInToken: DataStoredInToken = { _id: user._id };
    console.log('dataStoredInToken: ', dataStoredInToken);
    const secretKey: string = SECRET_KEY;
    const expiresIn: number = 60 * 60;
   
    
    return { expiresIn, token: sign(dataStoredInToken, secretKey, {
      algorithm: 'HS256',
      expiresIn,
    }) };
  }

  public createCookie(tokenData: TokenData): string {
    return `Authorization=${tokenData.token};`;
  }
}

export default AuthService;