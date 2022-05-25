import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { TenantEntity } from '../entities';
import { SaveTenantDto } from '../dto/tenant';
import { Repository } from 'typeorm';

@Injectable()
export class TenantService {
  constructor(
    @InjectRepository(TenantEntity)
    private readonly tenantRepository: Repository<TenantEntity>
  ) {}

  async findById(id: string | number) {
    return await this.tenantRepository.findOne({ id: +id })
  }

  async findOne(partialTenantEntity: Partial<TenantEntity>) {
    return await this.tenantRepository.findOne(partialTenantEntity)
  }

  async create(saveTenantDto: SaveTenantDto) {
    const findByTaxNo = await this.tenantRepository.findOne({ tenant_tax_no: saveTenantDto.tenant_tax_no })
    if (findByTaxNo) {
      return await this.tenantRepository.save({ ...findByTaxNo, ...saveTenantDto })
    }
    return await this.tenantRepository.save({ ...saveTenantDto })
  }

  async update(saveTenantDto: SaveTenantDto) {
    const findById = await this.findById(saveTenantDto.id);
    return await this.tenantRepository.save({ ...findById, ...saveTenantDto, tenant_tax_no: findById.tenant_tax_no })
  }

  async save(saveTenantDto: SaveTenantDto) {
    if (!saveTenantDto.id) {
      return await this.create(saveTenantDto)
    } else {
      return await this.update(saveTenantDto)
    }
  }
}
