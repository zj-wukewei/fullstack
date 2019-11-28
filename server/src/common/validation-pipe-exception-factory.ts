import { ValidationError, BadRequestException } from '@nestjs/common';

const exceptionFactory = (errors: ValidationError[]) => {
  const message = errors.map(error => Object.values(error.constraints).join('、')).join('、');
  return new BadRequestException(message);
};

export default exceptionFactory;
