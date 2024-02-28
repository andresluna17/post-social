import { CreationOptional, Optional } from 'sequelize';
import {
  AutoIncrement,
  Column,
  DataType,
  DeletedAt,
  Model,
  PrimaryKey,
  Table,
} from 'sequelize-typescript';

interface UserAttributes {
  id: number;
  name: string;
  firstName;
  lastName;
  email;
  password;
  isActive;
  hashdRt;
  deletedAt;
}

interface UserCreationAttributes extends Optional<UserAttributes, 'id'> {}

@Table
export class User extends Model<UserAttributes, UserCreationAttributes> {
  @PrimaryKey
  @AutoIncrement
  @Column(DataType.INTEGER)
  id: CreationOptional<number>;

  @Column
  firstName: string;

  @Column
  lastName: string;

  @Column
  email: string;

  @Column
  password: string;

  @Column({ defaultValue: true })
  isActive: boolean;

  @Column({ defaultValue: null })
  hashdRt: string | null;

  @DeletedAt
  deletedAt: Date | null;
}
