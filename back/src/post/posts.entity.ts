import { Entity, Column, PrimaryGeneratedColumn, OneToMany, OneToOne, JoinTable, JoinColumn, ManyToOne } from 'typeorm';
import { User } from 'src/users/user.entity';
import { Like } from './likes.entity';
import { Comment } from './comments.entity';

@Entity()
export class Posts {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    message:string;

    @Column( {default:''})
    fileUrl:string;

    @Column({ type: "timestamp", default: () => "CURRENT_TIMESTAMP"}) 
    date:string;

    @Column({default:true}) 
    isVisible:boolean;

    @Column({default:0})
    likesNumber:number

    @Column({default:0})
    dislikesNumber:number

    @ManyToOne(() => User,user=>user.id, {
        eager: true
    })
    @JoinTable()
    userId: User;

    @OneToMany(()=>Comment, comment=>comment.posts, {
        eager: true
    })
    @JoinTable()
    comments:Comment[]

    @OneToMany(()=>Like, Like=>Like.posts, {
        eager: true
    })
    @JoinColumn({name: 'id'})
    @JoinTable()
    likes: Like[];
}