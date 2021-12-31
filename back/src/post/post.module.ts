import { Module } from '@nestjs/common';
import { PostService } from './post.service';
import { PostController } from './post.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Posts } from './posts.entity';
import { PassportModule } from '@nestjs/passport';
import { Like } from './likes.entity';
import { Comment } from './comments.entity';

@Module({
  imports:[ TypeOrmModule.forFeature([Posts,Comment,Like]),
  PassportModule.register({ defaultStrategy: 'jwt', session: false })
],
  providers: [PostService],
  controllers: [PostController]
})
export class PostModule {}
