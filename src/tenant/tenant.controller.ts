import { Controller, Post, Body, Get, Param } from '@nestjs/common';
import { TenantService } from './tenant.service';
import { SaveTenantDto } from '../dto/tenant'
import { ApiTags } from "@nestjs/swagger";

@ApiTags('tenant')
@Controller('tenant')
export class TenantController {
  constructor(
    private readonly tenantService: TenantService,
  ) {}

  @Post('/save')
  create(@Body() saveTenantDto: SaveTenantDto) {
    return this.tenantService.save(saveTenantDto)
  }

  @Get(':id')
  findById(@Param('id') id: string) {
    return this.tenantService.findById(id)
  }
}
