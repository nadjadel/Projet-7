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
   
    TypeOrmModule.forRoot(),

    AuthModule,

    UsersModule,

    PostModule,

    FriendsModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
