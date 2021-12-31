import { Controller, Post, Body, Get, Put, Delete,Param, UseGuards, UseInterceptors, UploadedFile, Req} from '@nestjs/common';
import { UsersService } from './users.service';
import { User } from './user.entity';
import { AuthGuard } from '@nestjs/passport';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer'
import { editFileName } from 'src/utils/file-upload.utils';
@Controller('api/users')
export class UsersController {

    constructor(private service: UsersService) { }

    @Get(':id')
    @UseGuards(AuthGuard())
    get(@Param() params) {
        return this.service.getUser(params.id);
    }
    @Get()
    @UseGuards(AuthGuard())
    getAll() {
        return this.service.getUsers();
    }

    @Post()
    @UseInterceptors(
        FileInterceptor('image', {
          storage: diskStorage({
            destination: './files',
            filename: editFileName})
          }),
      )
    create(@Body() payload: User, @UploadedFile() file,@Req() req) {

        var createUser={
           email:payload.email,
           password:payload.password,
           firstName:payload.firstName,
           lastName:payload.lastName,
           imageUrl : ''
        }
        if(file){createUser.imageUrl =req.protocol + '://' + req.get('host') +'/api/posts/file/'+file.filename}
        return this.service.createUser(createUser);
    }

    @Put()
    @UseGuards(AuthGuard())
    update(@Body() user: User) {
        return this.service.updateUser(user);
    }

    @Delete(':id')
    @UseGuards(AuthGuard())
    deleteUser(@Param() params) {
        return this.service.deleteUser(params.id);
    }

}