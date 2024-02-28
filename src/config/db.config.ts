import { ConfigService } from '@nestjs/config';
import { SequelizeModuleOptions } from '@nestjs/sequelize';

export const dataBaseConfig = (
  configService: ConfigService,
): SequelizeModuleOptions => ({
  dialect: 'postgres',
  uri: configService.get('DB_URI'),
  autoLoadModels: true,
  synchronize: true,
});
