import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserRoleEntity } from '../entities';
import { CreateUserRoleDto } from '../dto/user-role';

@Injectable()
export class UserRoleService {
  constructor(
    @InjectRepository(UserRoleEntity)
    private readonly userRoleRepository: Repository<UserRoleEntity>
  ) {}

  async create(createUserRoleDto: CreateUserRoleDto) {
  }
}
