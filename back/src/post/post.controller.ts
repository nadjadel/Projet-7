import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  UseGuards,
  UseInterceptors,
  UploadedFile,
  Res,
  Req,
  Put,
} from '@nestjs/common';

import { Posts } from './posts.entity';
import { PostService } from './post.service';
import { AuthGuard } from '@nestjs/passport';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { editFileName } from 'src/utils/file-upload.utils';
import {User} from '../users/user.decorator'

@Controller('api/posts')
export class PostController {
  constructor(private postsService: PostService) {}

  @Get()
  @UseGuards(AuthGuard())
  findAll() {
    return this.postsService.getpost();
  }

  @Get(':id')
  @UseGuards(AuthGuard())
  findOne(@Param('id') id) {
    return this.postsService.findOne(id);
  }

  @Get('file/:fileId')
  async serveImage(
    @Param('fileId') fileId,
    @Res() res,
    @Req() req,
  ): Promise<any> {
   
    res.sendFile(fileId, { root: './files' });
  }
  @Post()
  @UseGuards(AuthGuard())
  @UseInterceptors(
    FileInterceptor('file', {
      storage: diskStorage({
        destination: './files',
        filename: editFileName,
      }),
    }),
  )
  create(@Body() post: Posts, @UploadedFile() file, @User() user ,@Req() req) {
    if(file){ post.fileUrl =
      req.protocol +
      '://' +
      req.get('host') +
      '/api/posts/file/' +
      file.filename;}
      
    return this.postsService.createpost(post);
  }

  @Put(':id')
  @UseGuards(AuthGuard())
  async editNote(@Body() post: Posts, @Param('id') id: number): Promise<Posts> {
    const postEdited = await this.postsService.editpost(id, post);
    return postEdited;
  }

  @Delete(':id')
  @UseGuards(AuthGuard())
  remove(@Param('id') id) {
    this.postsService.remove(id);
  }

  @Post(':id/like')
  @UseGuards(AuthGuard())
  async likePost(@Body() userId, @Param('id') id: number) {

    await this.postsService.likepost(id, userId);
    return null;
  }

  @Delete('like/:id')
  @UseGuards(AuthGuard())
  async deleteLike(@Body() post, @Param('id') id: number) {
    await this.postsService.deletelike(id);
    return null;
  }

  @Post(':id/comment')
  @UseGuards(AuthGuard())
  async commentPost(@Body() post, @Param('id') id: number) {
    console.log(post)
    return await this.postsService.comment(post);
   
  }
  @Delete('comment/:id')
  @UseGuards(AuthGuard())
  async deletComment(@Body() post, @Param('id') id: number) {
    await this.postsService.deleteComment(id);
    return null;
  }
}
