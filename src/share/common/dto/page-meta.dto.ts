import { IPageMetaParameters } from 'src/share/common/types.const';
import { ApiProperty } from '@nestjs/swagger';

export class PageMetaDto {
  @ApiProperty()
  readonly page: number;

  @ApiProperty()
  readonly take: number;

  @ApiProperty()
  readonly itemTotal: number;

  @ApiProperty()
  readonly pageTotal: number;

  @ApiProperty()
  readonly hasPreviousPage: boolean;

  @ApiProperty()
  readonly hasNextPage: boolean;

  constructor({ pageOptionsDto, itemTotal }: IPageMetaParameters) {
    this.page = pageOptionsDto.page;
    this.take = pageOptionsDto.take;
    this.itemTotal = itemTotal;
    this.pageTotal = Math.ceil(this.itemTotal / this.take);
    this.hasPreviousPage = this.page > 1;
    this.hasNextPage = this.page < this.pageTotal;
  }
}
