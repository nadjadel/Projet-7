import { Injectable, Inject, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { User } from './user.entity';
@Injectable()
export class UsersService {

    constructor(@InjectRepository(User) private usersRepository: Repository<User>) { }

    async getUsers(): Promise<User[]> {
        return await this.usersRepository.find();
    }

    async getUser(_id: number): Promise<User[]> {
        return await this.usersRepository.find({
            select: ['email','id','firstName','lastName'],
            where: [{ "id": _id }]
        });
    }
    async findOneByEmail(email: string): Promise<User[]> {
        return await this.usersRepository.find({
            select: ['id','email','password','firstName','lastName','imageUrl','roles','isActive'],
            where: [{ "email": email }]
        });
    }

    async createUser(user){

        const existingUser=await this.findOneByEmail(user.email)
        if(existingUser.length>1){
           
            throw new BadRequestException("l'email est déjà utilisé");
        }else{
            user.password = await bcrypt.hash(user.password, 10);
            return await this.usersRepository.save(user)
        }
      
    }

    async updateUser(user: User) {
       console.log(user)
        if(user.password){user.password=await bcrypt.hash(user.password, 10)}

     return await   this.usersRepository.update(user.id,user)
    }

    async deleteUser(user: User) {
        return await    this.usersRepository.delete(user);
    }

    
   
}