import { Entity, Column, PrimaryGeneratedColumn, BeforeInsert, JoinTable, ManyToOne } from 'typeorm';
import { User } from '../users/user.entity';


@Entity()
export class Friend {
  @PrimaryGeneratedColumn()
  id: number;

  
  @Column({default:true}) 
  isVisible:boolean;

  @Column() 
userId: number  ;


@ManyToOne(() => User,user=>user.id, {
    eager: true
})
@JoinTable()
contactId: User;

}