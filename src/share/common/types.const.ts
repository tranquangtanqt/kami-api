import { PageOptionsDto } from './dto/page-option.dto';

export interface IMessageErr {
  name: string;
  message: string;
}

export interface IPageMetaParameters {
  pageOptionsDto: PageOptionsDto;
  itemTotal: number;
}

export enum OrderBy {
  ASC = 'ASC',
  DESC = 'DESC',
}
