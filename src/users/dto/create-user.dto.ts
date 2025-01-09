import {
  IsBoolean,
  IsEmail,
  IsOptional,
  IsString,
  IsUUID,
  Matches,
  MaxLength,
  MinLength,
} from 'class-validator';

export class CreateUserDto {
  @IsString()
  full_name: string;

  @IsEmail()
  email: string;

  @IsString({ message: 'La contraseña debe ser una cadena de texto' })
  @MinLength(6, { message: 'La contraseña debe tener 6 o más caracteres' })
  @MaxLength(50, { message: 'La contraseña debe tener menos de 50 caracteres' })
  @Matches(/(?:(?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, {
    message:
      'La contraseña debe tener una letra mayúscula, una minúscula y un número.',
  })
  password: string;

  @IsString()
  @MinLength(10)
  phone: string;

  @IsUUID('4', { message: 'El rol debe ser un UUID' })
  role: string;

  @IsBoolean({ message: 'El valor de is_active debe ser un booleano' })
  @IsOptional()
  is_active?: boolean;
}
