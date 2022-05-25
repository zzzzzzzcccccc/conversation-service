import { BadRequestException, Injectable } from "@nestjs/common";
import { LogoAuthDto } from "../dto/auth";
import { compareSync } from 'bcryptjs'
import {
  ERROR_CODE_TENANT_NOT_FOUND,
  ERROR_CODE_USER_NOT_FOUND,
  ERROR_CODE_PASSWORD_ERROR,
  ERROR_CODE_TENANT_ENABLED, ERROR_CODE_USER_ENABLED
} from "../config";
import { JwtService } from "@nestjs/jwt";
import { AuthData } from './auth.jwt.strategy';
import { UserService } from "../user/user.service";
import { TenantService } from "../tenant/tenant.service";
import { TenantEntity, UserEntity } from "../entities";

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,

    private readonly userService: UserService,

    private readonly tenantService: TenantService
  ) {}

  async validLoginTenant(tenantTaxNo: string) {
    const tenant = await this.tenantService.findOne({ tenant_tax_no: tenantTaxNo })
    if (!tenant) {
      throw new BadRequestException({ message: 'tenant not found', error_code: ERROR_CODE_TENANT_NOT_FOUND })
    }
    if (!tenant.enabled) {
      throw new BadRequestException({ message: 'tenant not enabled', error_code: ERROR_CODE_TENANT_ENABLED })
    }
    return tenant
  }

  async validLoginUser(logoAuthDto: LogoAuthDto, tenant_id: string | number) {
    const user = await this.userService.findOne({ email: logoAuthDto.email, tenant_id: +tenant_id })
    if (!user) {
      throw new BadRequestException({ message: 'user not found', error_code: ERROR_CODE_USER_NOT_FOUND })
    }
    if (!user.password || !compareSync(logoAuthDto.password, user.password)) {
      throw new BadRequestException({ message: 'password error', error_code: ERROR_CODE_PASSWORD_ERROR })
    }
    return user
  }

  validProfileTenant(partialTenant: Partial<TenantEntity>) {
    if (!partialTenant) {
      throw new BadRequestException({ message: 'tenant not found', error_code: ERROR_CODE_TENANT_NOT_FOUND })
    }
    if (!partialTenant.enabled) {
      throw new BadRequestException({ message: 'tenant not enabled', error_code: ERROR_CODE_TENANT_ENABLED })
    }
    return partialTenant
  }

  validProfileUser(partialUser: Partial<UserEntity>) {
    if (!partialUser) {
      throw new BadRequestException({ message: 'user not found', error_code: ERROR_CODE_USER_NOT_FOUND })
    }
    if (!partialUser.enabled) {
      throw new BadRequestException({ message: 'user not enabled', error_code: ERROR_CODE_USER_ENABLED })
    }
    return partialUser
  }

  async login(logoAuthDto: LogoAuthDto) {
    const tenant = await this.validLoginTenant(logoAuthDto.tenant_tax_no);
    const user = await this.validLoginUser(logoAuthDto, tenant.id);
    return this.jwtService.sign({
      id: user.id,
      user_name: user.user_name,
      tenant_id: user.tenant_id,
      role_id: user.role_id
    } as Omit<AuthData, 'exp' | 'iat'>)
  }

  async profile(authData: AuthData) {
    const { id, tenant_id } = authData;
    const user = await this.userService.findById(id, authData)
    const tenant = await this.tenantService.findOne({ id: +tenant_id })
    return {
      tenant: this.validProfileTenant(tenant),
      user: this.validProfileUser(user),
    }
  }

  async refreshToken(authData: AuthData) {
    return this.jwtService.sign({
      id: authData.id,
      user_name: authData.user_name,
      tenant_id: authData.tenant_id,
      role_id: authData.tenant_id
    } as Omit<AuthData, 'exp' | 'iat'>)
  }
}
