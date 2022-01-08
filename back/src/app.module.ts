import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { MulterModule } from '@nestjs/platform-express';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PostModule } from './post/post.module';
import { FriendsModule } from './friends/friends.module';


@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    MulterModule.register({
      dest: './files',
    }),
   
    TypeOrmModule.forRoot({
     /* "type": "mysql",
      "host": "sql11.freemysqlhosting.net",
      "port": 3306,
      "username": "sql11462604",
      "password": "xC843zV5ZW",
      "database": "sql11462604",*/

      "type": "mysql",
      "host": "127.0.0.1",
      "port": 3306,
      "username": "root",
      "password": "118133",
      "database": "groupomania",

      "entities": ["dist/**/*.entity{.ts,.js}"],
      "synchronize": true,
      
    }),

    AuthModule,

    UsersModule,

    PostModule,

    FriendsModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
