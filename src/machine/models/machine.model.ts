import {
  Table,
  Model,
  Column,
  DataType,
  ForeignKey,
  BelongsTo,
  BelongsToMany,
} from 'sequelize-typescript';
import { Company } from 'src/company/models/company.model';
import { Driver } from 'src/driver/models/driver.model';
import { MachineDriver } from 'src/machine_driver/models/machine-driver.model';

interface machineAtr {
  name: string;
  companyId: number;
}

@Table({ tableName: 'machine' })
export class Machine extends Model<Machine, machineAtr> {
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
  companyId: number;

  @BelongsTo(() => Company)
  company: Company;

  @BelongsToMany(() => Driver, () => MachineDriver)
  machines: Driver[];
}
