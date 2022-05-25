import { Controller } from '@nestjs/common';
import { ApiTags } from "@nestjs/swagger";

@ApiTags('user-role')
@Controller('user-role')
export class UserRoleController {}
