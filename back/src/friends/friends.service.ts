import { Injectable, Inject, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { Friend } from './friend.entity';

@Injectable()
export class FriendsService {

    constructor(@InjectRepository(Friend) private contactRepository: Repository<Friend>) { }

    
    async getContacts(id) {
        return await this.contactRepository.find({userId:id.id});
        
    }
    async addContact(contact){
        return await   this.contactRepository.save(contact)
    }
    async deleteContact(contact){
        return await   this.contactRepository.delete(contact)
    }

   
}