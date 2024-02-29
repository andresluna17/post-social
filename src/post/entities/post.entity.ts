import { CreationOptional, DataTypes, Optional } from 'sequelize';
import {
  AutoIncrement,
  BelongsTo,
  Column,
  CreatedAt,
  DataType,
  DefaultScope,
  DeletedAt,
  ForeignKey,
  Model,
  PrimaryKey,
  Table,
  UpdatedAt,
} from 'sequelize-typescript';
import { User } from 'src/user/entities/user.entity';

interface PostAttributes {
  id: number;
  title: string;
  content;
  likes;
  creationDate: Date | null;
  lastUpdateDate: Date | null;
  deletedAt: Date | null;
  userId: number;
}

interface PostCreationAttributes
  extends Optional<PostAttributes, 'id' | 'likes'> {}

@Table
@DefaultScope(() => ({
  attributes: { exclude: ['password'] },
}))
export class Post extends Model<PostAttributes, PostCreationAttributes> {
  @PrimaryKey
  @AutoIncrement
  @Column(DataType.INTEGER)
  id: CreationOptional<number>;

  @Column
  title: string;

  @Column
  content: string;

  @Column(DataTypes.INTEGER)
  likes: number;

  @CreatedAt
  creationDate: CreationOptional<Date>;

  @UpdatedAt
  lastUpdateDate: CreationOptional<Date>;

  @DeletedAt
  deletedAt: Date | null;

  @ForeignKey(() => User)
  @Column
  userId: number;

  @BelongsTo(() => User)
  user: User;
}
