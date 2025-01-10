import {
  IsString,
  IsNotEmpty,
  IsEmail,
  IsBoolean,
  IsOptional,
  IsUUID,
} from 'class-validator';

export class CreateCustomerDto {
  @IsString({ message: 'El nombre debe ser una cadena de texto' })
  @IsNotEmpty({ message: 'El nombre es requerido' })
  full_name: string;

  @IsEmail({}, { message: 'El email debe ser una dirección de correo válida' })
  @IsNotEmpty({ message: 'El email es requerido' })
  email: string;

  @IsString({ message: 'El departamento debe ser una cadena de texto' })
  @IsNotEmpty({ message: 'El departamento es requerido' })
  department: string;

  @IsString({ message: 'La ciudad debe ser una cadena de texto' })
  @IsNotEmpty({ message: 'La ciudad es requerida' })
  city: string;

  @IsString({
    message: 'La direccion debe ser una cadena de texto',
  })
  @IsNotEmpty({ message: 'La direccion es requerida' })
  address: string;

  @IsString({ message: 'El telefono debe ser una cadena de texto' })
  @IsNotEmpty({ message: 'El telefono es requerido' })
  phone: string;

  @IsUUID('4', { message: 'El company_id debe ser un UUID' })
  company_id: string;

  @IsBoolean({ message: 'El valor de is_active debe ser un booleano' })
  @IsOptional()
  is_active?: boolean;
}
