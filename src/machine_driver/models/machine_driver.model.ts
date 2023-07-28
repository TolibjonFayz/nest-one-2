import {
  Table,
  Model,
  Column,
  DataType,
  ForeignKey,
  BelongsTo,
  HasMany,
} from 'sequelize-typescript';
import { Driver } from '../../driver/models/driver.model';
import { Machine } from '../../machine/models/machine.model';

interface Machine_DriverAttr {
  machineId: number;
  driverId: number;
}

@Table({ tableName: 'machine_driver' })
export class Machine_Driver extends Model<Machine_Driver, Machine_DriverAttr> {
  @Column({
    type: DataType.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  })
  id: number;

  @ForeignKey(() => Machine)
  @Column({
    type: DataType.INTEGER,
    onDelete: 'CASCADE',
  })
  machineId: number;

  @BelongsTo(() => Machine)
  machine: Machine;

  @ForeignKey(() => Driver)
  @Column({
    type: DataType.INTEGER,
    onDelete: 'CASCADE',
  })
  driverId: number;
}
