import { Controller, Post, Body } from '@nestjs/common';
import { AuthService } from './auth.service';
import { ApiTags } from '@nestjs/swagger';

@Controller('api/auth/login')
@ApiTags('login')
export class AuthController {

    constructor(private authService: AuthService) {

    }

    @Post() 
    async login(@Body() loginUserDto){
       
       return  await this.authService.validateUserByPassword(loginUserDto);

        
    }

}