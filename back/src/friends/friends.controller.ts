import { Controller, Post, Body, Get,  Delete,Param, UseGuards} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { FriendsService } from './friends.service';
@Controller('api/contact')
export class FriendsController {

    constructor(private service: FriendsService) { }


    @Get(':id')
    @UseGuards(AuthGuard())
    getContact(@Param() id){
        console.log(id);
        return this.service.getContacts(id)
    }
    
    @Post()
    @UseGuards(AuthGuard())
    addContact(@Body() contact){
        return this.service.addContact(contact);
    }

    @Delete(':id')
    @UseGuards(AuthGuard())
    deleteContact(@Param() params) {
     return this.service.deleteContact(params.id)
    }

    


}