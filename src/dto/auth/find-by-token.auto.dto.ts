import { IsNotEmpty } from 'class-validator'

export class FindByTokenAutoDto {
  @IsNotEmpty()
  token: string
}
