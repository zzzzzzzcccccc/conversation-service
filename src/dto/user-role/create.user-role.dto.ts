import { IsNotEmpty, Length } from 'class-validator';

export class CreateUserRoleDto {
  @Length(1, 50)
  @IsNotEmpty()
  role_name: string;
}