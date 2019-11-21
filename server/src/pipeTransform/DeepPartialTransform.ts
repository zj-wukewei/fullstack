import { ArgumentMetadata, PipeTransform, Injectable } from '@nestjs/common';

@Injectable()
export class DeepPartialTransform implements PipeTransform {
  async transform(value: any, metadata: ArgumentMetadata) {
    return Object.assign(metadata.metatype, value);
  }
}