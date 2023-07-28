import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { CompanyService } from './company.service';
import { CreateCompanyDto } from './dto/create-company.dto';
import { Company } from './models/company.model';
import { UpdateCompanyDto } from './dto/update-company.dto';
import { ApiTags, ApiOperation } from '@nestjs/swagger';

@ApiTags('Kompaniya')
@Controller('company')
export class CompanyController {
  constructor(private readonly companyService: CompanyService) {}

  @ApiOperation({ summary: 'Kompaniya yaratish' })
  @Post('create')
  async createCompany(
    @Body() createCompanyDto: CreateCompanyDto,
  ): Promise<Company> {
    const company = await this.companyService.createCompany(createCompanyDto);
    return company;
  }

  @ApiOperation({ summary: 'Kompaniyalarni ko`rish' })
  @Get('all')
  async getAllCompany(): Promise<Company[]> {
    return this.companyService.getAllCompany();
  }

  @ApiOperation({ summary: 'Kompaniyani id orqali topish' })
  @Get(':id')
  async getCompanyById(@Param('id') id: string): Promise<Company> {
    return this.companyService.getCompanyById(+id);
  }

  @ApiOperation({ summary: 'Kompaniyani nomi orqali topish' })
  @Get('name/:name')
  async getCompanyByName(@Param('name') name: string): Promise<Company> {
    return this.companyService.getCompanyByName(name);
  }

  @ApiOperation({ summary: 'Kompaniyani id orqali o`chirish' })
  @Delete('id')
  async deleteCompanyById(@Param('id') id: string): Promise<number> {
    return this.companyService.deleteCompanyById(+id);
  }

  @ApiOperation({ summary: 'Kompaniyani id orqali o`zgartirish' })
  @Put(':id')
  async updateCompany(
    @Param('id') id: string,
    @Body() updateCompanyDto: UpdateCompanyDto,
  ): Promise<Company> {
    return this.companyService.updateCompany(+id, updateCompanyDto);
  }
}
