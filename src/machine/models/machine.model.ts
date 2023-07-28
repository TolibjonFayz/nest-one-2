import {
  Table,
  Model,
  Column,
  DataType,
  ForeignKey,
  BelongsTo,
  HasMany,
  BelongsToMany,
} from 'sequelize-typescript';
import { Company } from '../../company/models/company.model';
import { Driver } from '../../driver/models/driver.model';
import { Machine_Driver } from '../../machine_driver/models/machine_driver.model';

interface MachineAttr {
  name: string;
  company_id: number;
}

@Table({ tableName: 'machine' })
export class Machine extends Model<Machine, MachineAttr> {
  @Column({
    type: DataType.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  })
  id: number;

  @Column({
    type: DataType.STRING,
    allowNull: false,
    unique: true,
  })
  name: string;

  @ForeignKey(() => Company)
  @Column({
    type: DataType.INTEGER,
    onDelete: 'CASCADE',
  })
  company_id: number;

  @BelongsTo(() => Company)
  company: Company;

  @BelongsToMany(() => Driver, () => Machine_Driver)
  drivers: Driver;
}
