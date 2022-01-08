import { Entity, Column, PrimaryGeneratedColumn, BeforeInsert } from 'typeorm';


export enum UserRole {
    ADMIN = "ROLE_ADMIN",
    MODERATOR = "ROLE_MODERATOR",
    USER = "ROLE_USER"
}


@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  email: string;

  @Column()
  password: string;

  @Column()
  firstName: string;

  @Column()
  lastName: string;

  @Column({ default: '' })
  imageUrl: string;

  @Column({ type: "enum",
  enum: UserRole,
  default: UserRole.USER })
  roles: string;

  @Column({ default: true })
  isActive: boolean;

  
}

