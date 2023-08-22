import {
  TypeOrmModuleAsyncOptions,
  TypeOrmModuleOptions,
} from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { DATABASE_CONFIG_POSTGRESQL } from './constant.config';
import { DataSource } from 'typeorm';

const configDatabasePostgreSQL: any = {
  type: DATABASE_CONFIG_POSTGRESQL.TYPE as any,
  host: DATABASE_CONFIG_POSTGRESQL.HOST,
  port: DATABASE_CONFIG_POSTGRESQL.PORT,
  username: DATABASE_CONFIG_POSTGRESQL.USERNAME,
  password: DATABASE_CONFIG_POSTGRESQL.PASSWORD,
  database: DATABASE_CONFIG_POSTGRESQL.DATABASE,
  extra: { charset: 'utf8mb4_unicode_ci' },
  entities: [`dist/entities/*.entity.js`],
  migrations: [`dist/database/migrations/*.js`],
  // synchronize: true,
  logging: DATABASE_CONFIG_POSTGRESQL.LOGGING,
  autoLoadEntities: true,
  // ssl: {
  //   rejectUnauthorized: false,
  // },
};

const configDatabase: TypeOrmModuleOptions = configDatabasePostgreSQL;

export const typeOrmAsyncConfigDatabase: TypeOrmModuleAsyncOptions = {
  imports: [ConfigModule],
  inject: [ConfigService],
  useFactory: async (): Promise<TypeOrmModuleOptions> => configDatabase,
};

export const typeOrmConfig: TypeOrmModuleOptions = configDatabase;

export default new DataSource(configDatabasePostgreSQL);
