import { User } from 'src/users/user.entity';
import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, OneToOne, JoinTable, JoinColumn } from 'typeorm';
import { Posts } from './posts.entity';

@Entity()
export class Comment {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    message:string;

    

    @Column({ type: "timestamp", default: () => "CURRENT_TIMESTAMP"}) 
    date:string;

    @Column({default:true}) 
    isVisible:boolean;

    @ManyToOne(() => Posts, posts => posts.comments)
    @JoinTable()
    posts: Posts;

    @ManyToOne(() => User,user=>user.id, {
        eager: true
    })
    @JoinColumn({name: 'userId'})
    @JoinTable()
    userId: User;

    @Column({ nullable: true })
    repliesId?: number;

    @ManyToOne(() => Comment, comment => comment.id)
    @JoinColumn({ name: "repliesId" })
    replies: Posts;


}