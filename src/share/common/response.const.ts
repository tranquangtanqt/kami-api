import { HttpException, HttpStatus } from '@nestjs/common';
import { IMessageErr } from './types.const';

interface IResponseAPI {
  statusCode: HttpStatus;
  message: string;
  messages?: [];
  data: any;
}

const successAPI: IResponseAPI = {
  statusCode: HttpStatus.OK,
  message: 'Successfully!',
  data: null,
};

const errorAPI = (
  message: string | IMessageErr[],
  code = HttpStatus.BAD_REQUEST,
) => {
  throw new HttpException(message, code);
};

export { IResponseAPI, successAPI, errorAPI };
