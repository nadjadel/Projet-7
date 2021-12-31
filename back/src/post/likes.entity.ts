import { User } from 'src/users/user.entity';
import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, OneToOne, JoinTable, JoinColumn } from 'typeorm';
import { Posts } from './posts.entity';

@Entity()
export class Like {

    @PrimaryGeneratedColumn()
    id: number;

   @Column({ type: "timestamp", default: () => "CURRENT_TIMESTAMP"}) 
    date:string;

    @Column({default:0})
    likes:number

    @Column({default:0})
    dislikes:number

    
    @ManyToOne(() => Posts, posts => posts.likes)
    posts: Posts;

    @ManyToOne(() => User,user=>user.id,{
        eager: true
    })
    @JoinColumn({name: 'userId'})
    @JoinTable()
    userId: User;


}