import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { UserEntity, UserStatusEnums } from "../entities";
import { CreateUserDto } from "../dto/user";
import { Repository } from "typeorm";
import { hashSync } from "bcryptjs";
import { AuthData } from "../auth/auth.jwt.strategy";

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>
  ) {}

  encryptPassword(partialUserEntity: Partial<UserEntity>) {
    if (partialUserEntity.password) {
      partialUserEntity.password = hashSync(partialUserEntity.password, 10);
    }
    return partialUserEntity;
  }

  ignorePassword(partialUserEntity:Partial<UserEntity> = {}) {
    const { password, ...result } = partialUserEntity;
    return result;
  }

  async create(createUserDto: CreateUserDto) {
    const findByEmail = await this.userRepository.findOne({ email: createUserDto.email, tenant_id: 1 });
    if (findByEmail) {
      return this.ignorePassword(await this.userRepository.save(this.encryptPassword({ ...findByEmail, ...createUserDto })));
    }
    return this.ignorePassword(await this.userRepository.save(this.encryptPassword({ ...createUserDto, tenant_id: 1 })));
  }

  async findById(id: string | number, authData: AuthData, hasPassword = false) {
    return hasPassword ?
      await this.userRepository.findOne({ id: +id, tenant_id: +authData.tenant_id }) :
      this.ignorePassword(await this.userRepository.findOne({ id: +id, tenant_id: +authData.tenant_id }));
  }

  async findOne(partialUser: Partial<UserEntity>) {
    return await this.userRepository.findOne(partialUser)
  }

  async updateUserStatus(userId: string | number, tenantId: string | number, status: UserStatusEnums) {
    const user = await this.findOne({ id: +userId, tenant_id: +tenantId })
    if (user.status !== status) {
      return await this.userRepository.save({ ...user, status })
    } else {
      return user
    }
  }

  async findByIds(userIds: number[], tenantId: string | number) {
    return await this.userRepository.findByIds(userIds, { tenant_id: +tenantId })
  }
}
