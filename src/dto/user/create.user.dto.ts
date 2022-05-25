import { IsDate, IsEmail, IsEnum, IsNotEmpty, Length } from "class-validator";
import { UserGenderEnums } from "../../entities";

export class CreateUserDto {
  @IsNotEmpty()
  @Length(1, 50)
  user_name: string;

  @IsNotEmpty()
  @Length(6, 32)
  password: string;

  phone_number: string;

  avatar_url: string;

  @IsEnum(UserGenderEnums)
  gender: UserGenderEnums = UserGenderEnums.unknown;

  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  role_id: number;

  @IsDate()
  birthday: Date = new Date();
}
