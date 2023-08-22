import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { BaseEntity } from './base.entity';
import { ApiHideProperty, ApiProperty } from '@nestjs/swagger';

@Entity({ name: 'picture' })
export class Picture extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  @Column()
  key: string;

  @Column()
  name: string;

  @Column({ name: 'color_number' })
  colorNumber: number;

  @Column()
  size: string;

  @Column()
  price: number;

  @ApiProperty()
  @Column()
  quantity: number;

  @ApiHideProperty()
  @Column()
  link: string;

  @ApiHideProperty()
  @Column({ name: 'file_path' })
  filePath: string;

  @ApiHideProperty()
  @Column({ name: 'file_name' })
  fileName: string;

  @ApiHideProperty()
  @Column({ name: 'file_size' })
  fileSize: number;

  @ApiHideProperty()
  @Column({ name: 'file_type' })
  fileType: string;

  @ApiHideProperty()
  @Column({ name: 'shoppe_code', nullable: true })
  shoppeCode: string;
}
