import {
  InternalServerErrorException,
  BadRequestException,
  NotFoundException,
} from '@nestjs/common';

export const validateErrors = (error: any, message = '') => {
  if (error.code === '23505') {
    throw new BadRequestException(`Ya existe ${message} con ese valor`);
  }

  if (error.status === 400) {
    throw new BadRequestException(error.message);
  }

  if (error.status === 404) {
    throw new NotFoundException(error.message);
  }

  throw new InternalServerErrorException([
    'Error inesperado, verifique los registros del servidor',
    error.detail,
  ]);
};
