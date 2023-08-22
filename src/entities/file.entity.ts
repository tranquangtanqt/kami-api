import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { BaseEntity } from './base.entity';

@Entity({ name: 'files' })
export class File extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  @Column()
  key: string;

  @Column()
  name: string;

  @Column({ nullable: true })
  link: string;

  @Column({ name: 'path_file', nullable: true })
  pathFile: string;

  @Column({ nullable: true })
  expires: Date;

  @Column()
  expiry: string;

  @Column({ default: 0 })
  downloads: number;

  @Column({ default: 0 })
  maxDownloads: number;

  @Column({ default: false })
  autoDelete: boolean;

  @Column()
  size: number;

  @Column()
  mimeType: string;
}
