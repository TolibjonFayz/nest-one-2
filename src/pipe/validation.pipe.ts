import { Injectable, ArgumentMetadata, PipeTransform } from '@nestjs/common';
import { plainToInstance } from 'class-transformer';
import { validate } from 'class-validator';
import { ValidationException } from '..//exceptions/validation.exception';

@Injectable()
export class ValidaitonPipe implements PipeTransform<any> {
  async transform(value: any, metadate: ArgumentMetadata): Promise<any> {
    const obj = plainToInstance(metadate.metatype, value);
    const errors = await validate(obj);
    if (errors.length) {
      let messages = errors.map((err) => {
        return `${err.property} - ${Object.values(err.constraints).join(
          ', |',
        )}`;
      });
      throw new ValidationException(messages);
    }
    return value;
  }
}
