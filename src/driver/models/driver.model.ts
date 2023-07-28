import {
  Table,
  Model,
  Column,
  DataType,
  BelongsToMany,
} from 'sequelize-typescript';
import { Machine } from '../../machine/models/machine.model';
import { Machine_Driver } from '../../machine_driver/models/machine_driver.model';

interface DriverAttr {
  first_name: string;
  last_name: string;
}

@Table({ tableName: 'driver' })
export class Driver extends Model<Driver, DriverAttr> {
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
  first_name: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
    unique: true,
  })
  last_name: string;

  @BelongsToMany(() => Machine, () => Machine_Driver)
  machines: Machine;
}
