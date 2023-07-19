import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Company } from './models/company.model';
import { createCompanyDto } from './dto/create-company.dto';
import { UpdateCompanyDto } from './dto/update-company.dto';

@Injectable()
export class CompanyService {
  constructor(@InjectModel(Company) private companyRepo: typeof Company) {}

  async createCompany(createCompanyDto: createCompanyDto): Promise<Company> {
    const company = await this.companyRepo.create(createCompanyDto);
    return company;
  }

  async getAllCompany(): Promise<Company[]> {
    const companies = await this.companyRepo.findAll();
    return companies;
  }

  async getCompanyById(id: number): Promise<Company> {
    const company = await this.companyRepo.findByPk(id);
    return company;
  }

  async getCompanyByName(name: string): Promise<Company> {
    const company = await this.companyRepo.findOne({ where: { name } });
    return company;
  }

  async deleteCompanyById(id: number): Promise<number> {
    return this.companyRepo.destroy({ where: { id } });
  }

  async updateCompany(
    id: number,
    UpdateCompanyDto: UpdateCompanyDto,
  ): Promise<Company> {
    const company = await this.companyRepo.update(UpdateCompanyDto, {
      where: { id },
      returning: true,
    });
    return company[1][0].dataValues;
  }
}
