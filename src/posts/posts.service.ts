import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { CreatePostDto } from './dto/create-post.dto';
import { Post } from './models/posts.model';
import { FilesService } from '../files/files.service';

@Injectable()
export class PostsService {
  constructor(
    @InjectModel(Post) private postRepository: typeof Post,
    private readonly fileService: FilesService,
  ) {}

  async create(createPostDto: CreatePostDto, image: any) {
    console.log(image);
    const fileName = await this.fileService.createFile(image);
    const post = await this.postRepository.create({
      ...createPostDto,
      image: fileName,
    });
    return post;
  }
}
