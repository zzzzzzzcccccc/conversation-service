import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserRoleEntity } from '../entities'
import { UserRoleController } from './user-role.controller'
import { UserRoleService } from './user-role.service';

@Module({
  imports: [TypeOrmModule.forFeature([UserRoleEntity])],
  controllers: [UserRoleController],
  providers: [UserRoleService]
})
export class UserRoleModule {}
