import { plainToClass } from 'class-transformer';
import { validate, ValidationError } from 'class-validator';
import { RequestHandler } from 'express';
import { HttpException } from '@exceptions/HttpException';
import { verify } from 'jsonwebtoken';
import { SECRET_KEY } from '@config';
import { DataStoredInToken } from '@interfaces/auth.interface';
import userModel from '@models/users.model';

const authValidationMiddleware = (
  type: any,
  value: string | 'body' | 'query' | 'params' = 'body',
  skipMissingProperties = false,
  whitelist = true,
  forbidNonWhitelisted = true,
): RequestHandler => {
  return async (req, res, next) => {
    try {
    const Authorization = req.cookies['Authorization'] || (req.header('Authorization') ? req.header('Authorization').split('Bearer ')[1] : null);

    if (Authorization) {
      const secretKey: string = SECRET_KEY;
      const verificationResponse = (await verify(Authorization, secretKey)) as DataStoredInToken;
      const userId = verificationResponse._id;
      console.log('userId: ', userId);
      const findUser = await userModel.findById(userId);
      
      if (findUser) {
        req.uid = userId;
        validate(plainToClass(type, req[value]), { skipMissingProperties, whitelist, forbidNonWhitelisted }).then((errors: ValidationError[]) => {
          console.log('errors: ', errors);
          if (errors.length > 0) {
            const message = errors.map((error: ValidationError) => Object.values(error.constraints)).join(', ');
            next(new HttpException(400, message));
          } else {
            next();
          }
        });
      } else {
        next(new HttpException(401, 'Wrong authentication token'));
      }
    } else {
      next(new HttpException(404, 'Authentication token missing'));
    }

  } catch (error) {
    throw error
      
  }
  };
};

export default authValidationMiddleware;
