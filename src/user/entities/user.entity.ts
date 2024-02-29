import { CreationOptional, Optional } from 'sequelize';
import {
  AutoIncrement,
  Column,
  CreatedAt,
  DataType,
  DefaultScope,
  DeletedAt,
  HasMany,
  Model,
  PrimaryKey,
  Table,
  UpdatedAt,
} from 'sequelize-typescript';
import { Post } from 'src/post/entities/post.entity';

interface UserAttributes {
  id: number;
  fullName: string;
  age: number;
  email: string;
  password: string;
  isActive: boolean;
  hashdRt: string;
  creationDate: Date | null;
  lastUpdateDate: Date | null;
  deletedAt: Date | null;
}

interface UserCreationAttributes
  extends Optional<UserAttributes, 'id' | 'hashdRt'> {}

@Table
@DefaultScope(() => ({
  attributes: { exclude: ['password'] },
}))
export class User extends Model<UserAttributes, UserCreationAttributes> {
  @PrimaryKey
  @AutoIncrement
  @Column(DataType.INTEGER)
  id: CreationOptional<number>;

  @Column
  fullName: string;

  @Column(DataType.INTEGER)
  age: number;

  @Column
  email: string;

  @Column
  password: string;

  @Column({ defaultValue: true })
  isActive: boolean;

  @Column({ defaultValue: null })
  hashdRt: string | null;

  @CreatedAt
  creationDate: CreationOptional<Date>;

  @UpdatedAt
  lastUpdateDate: CreationOptional<Date>;

  @DeletedAt
  deletedAt: Date | null;

  @HasMany(() => Post)
  posts: Post[];
}
