import { Injectable } from '@nestjs/common';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { Post } from './entities/post.entity';
import { InjectModel } from '@nestjs/sequelize';

@Injectable()
export class PostService {
  constructor(
    @InjectModel(Post)
    private postModel: typeof Post,
  ) {}

  create(createPostDto: CreatePostDto, userId: number) {
    return this.postModel.create({ ...createPostDto, userId });
  }

  async findPagination(page: number, size: number) {
    const offset = (page - 1) * size;
    const { count: total, rows: data } = await this.postModel.findAndCountAll({
      offset,
      limit: size,
      order: [['creationDate', 'DESC']],
    });

    return { total, page, data };
  }

  findOne(id: number) {
    return this.postModel.findOne({ where: { id } });
  }

  update(id: number, updatePostDto: UpdatePostDto) {
    return this.postModel.update(updatePostDto, { where: { id } });
  }

  remove(id: number) {
    return this.postModel.destroy({ where: { id } });
  }
}
