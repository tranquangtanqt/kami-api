import { Picture } from 'src/entities/picture.entity';
import { PageOptionsDto } from 'src/share/common/dto/page-option.dto';
import { DataSource, SelectQueryBuilder } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { BaseRepository } from './base.repository';

@Injectable()
export class PictureRepository extends BaseRepository<Picture> {
  constructor(private dataSource: DataSource) {
    super(Picture, dataSource.createEntityManager());
  }

  /**
   * This is function find all
   */
  public async findAll(pageOptionsDto: PageOptionsDto): Promise<{
    entities: Picture[];
    raw: any[];
  }> {
    const queryBuilder: SelectQueryBuilder<Picture> = this.createQueryBuilder()
      .orderBy('id', pageOptionsDto.order)
      .skip(pageOptionsDto.skip)
      .take(pageOptionsDto.take);
    return await queryBuilder.getRawAndEntities();
  }

  /**
   * This is function find by key
   */
  public async findByKey(key: string): Promise<Picture> {
    return await this.findOne({
      where: { key: key },
    });
  }

  public async getByCategory(category: string): Promise<{
    entities: Picture[];
    raw: any[];
  }> {
    const queryBuilder: SelectQueryBuilder<Picture> = this.createQueryBuilder()
      .where('category = :category', { category: category })
      .orderBy('list_order', 'ASC');
    return await queryBuilder.getRawAndEntities();
  }
}
