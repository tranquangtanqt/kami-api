import { BaseEntity } from 'src/entities/base.entity';
import { FindOptionsWhere, Repository } from 'typeorm';

export class BaseRepository<T extends BaseEntity> extends Repository<T> {
  /**
   * This is function create
   */
  public async add(createDto: any) {
    return await this.save(createDto);
  }

  /**
   * This is function edit
   */
  public async edit(updateDto: any) {
    return await this.save(updateDto);
  }

  /**
   * This is function destroy
   */
  public async destroy(deleteDto: any) {
    return await this.save(deleteDto);
  }

  /**
   * This is function find by id
   */
  public async findById(id: number): Promise<T> {
    return await this.findOneBy({ id: id } as FindOptionsWhere<T>);
  }
}
