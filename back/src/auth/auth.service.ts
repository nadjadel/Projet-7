import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../users/users.service';
import { JwtPayload } from './interfaces/jwt-payload.interface';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async validateUserByPassword(loginAttempt) {
    // This will be used for the initial login
    let userToAttempt = await this.usersService.findOneByEmail(
      loginAttempt.email,
    );
    

    return new Promise((resolve) => {
      // Check the supplied password against the hash stored for this email address
     
      this.checkPassword(
        loginAttempt.password,
        userToAttempt[0],
        (err, isMatch) => {
         
          if (err) throw new UnauthorizedException();

          if (isMatch) {
           
            // If there is a successful match, generate a JWT for the user
            resolve(this.createJwtPayload(userToAttempt[0]));
          } else {
            resolve( {message:'login/mot de passe incorrect!'})
          }
        },
      );
    });
  }

  async validateUserByJwt(payload: JwtPayload) {
    // This will be used when the user has already logged in and has a JWT

    let user = await this.usersService.findOneByEmail(payload.email);

    if (user) {
      return this.createJwtPayload(user);
    } else {
      return {message:'Token expiré!'}
    }
  }

  createJwtPayload(user) {
    
    let data: JwtPayload = {
      id: user.id,
      email: user.email,
    };

    let jwt = this.jwtService.sign(data);

    return { userId: user.id,token: jwt,user:{firstName:user.firstName,lastName:user.lastName,email:user.email,avatar:user.imageUrl,roles:user.roles,isActive:user.isActive} };
  }

  checkPassword = function (attempt, user, callback) {
    bcrypt.compare(attempt, user.password, (err, isMatch) => {
      if (err) return callback(err);
      callback(null, isMatch);
    });
  };
}
