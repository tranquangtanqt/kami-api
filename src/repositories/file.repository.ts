import { File } from 'src/entities/file.entity';
import { PageOptionsDto } from 'src/share/common/dto/page-option.dto';
import { DataSource, SelectQueryBuilder } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { BaseRepository } from './base.repository';

@Injectable()
export class FileRepository extends BaseRepository<File> {
  constructor(private dataSource: DataSource) {
    super(File, dataSource.createEntityManager());
  }

  /**
   * This is function find all
   */
  public async findAll(pageOptionsDto: PageOptionsDto): Promise<{
    entities: File[];
    raw: any[];
  }> {
    const queryBuilder: SelectQueryBuilder<File> = this.createQueryBuilder()
      .orderBy('id', pageOptionsDto.order)
      .skip(pageOptionsDto.skip)
      .take(pageOptionsDto.take);
    return await queryBuilder.getRawAndEntities();
  }

  /**
   * This is function find by key
   */
  public async findByKey(key: string): Promise<File> {
    return await this.findOne({
      where: { key: key },
    });
  }

  public async getByCategory(category: string): Promise<{
    entities: File[];
    raw: any[];
  }> {
    const queryBuilder: SelectQueryBuilder<File> = this.createQueryBuilder()
      .where('category = :category', { category: category })
      .orderBy('list_order', 'ASC');
    return await queryBuilder.getRawAndEntities();
  }
}
