import {  BadRequestException } from '@nestjs/common';

export class CommonException extends BadRequestException {
  constructor(msg: string) {
    super(msg);
  }
}
