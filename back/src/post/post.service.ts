import { Injectable, NotFoundException, Post } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Comment } from './comments.entity';
import { Like } from './likes.entity';
import { Posts } from './posts.entity';

@Injectable()
export class PostService {
  constructor(
    @InjectRepository(Posts) private postRepository: Repository<Posts>,
    @InjectRepository(Like) private likeRepository: Repository<Like>,
    @InjectRepository(Comment) private commentRepository: Repository<Comment>,
  ) {}
  async getpost(): Promise<Posts[]> {
    return await this.postRepository.find();
  }

  async findOne(id: number): Promise<Posts> {
    return await this.postRepository.findOne({ "id": id });
  }

  async createpost(post: Posts) {
    await this.postRepository.save(post);
  }

  async remove(id: string): Promise<void> {
    await this.postRepository.delete(id);
  }

  async editpost(id: number, post: Posts): Promise<Posts> {
    
    await this.postRepository.update(id,post);
     return this.findOne(id) 
     }

  async likepost(id,user){
    const postLike={
      likes:1,
      posts:id,
      userId:user.userId
    }
   console.log(postLike)
    const result = await this.likeRepository.save(postLike);
  }

  async deletelike(id:number){
    await this.likeRepository.delete(id);
  }

  async comment(postComment){
    let commentedPost=await this.commentRepository.save(postComment);
    return commentedPost;
  }

  async deleteComment(id){
    await this.commentRepository.delete(id);
  }
}