import {
  Table,
  Model,
  Column,
  DataType,
  ForeignKey,
  BelongsTo,
} from 'sequelize-typescript';
import { Driver } from 'src/driver/models/driver.model';
import { Machine } from 'src/machine/models/machine.model';

interface machine_driverAtr {
  machineId: number;
  driverId: number;
}

@Table({ tableName: 'machine_driver' })
export class MachineDriver extends Model<MachineDriver, machine_driverAtr> {
  @Column({
    type: DataType.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  })
  id: number;

  @ForeignKey(() => Machine)
  @Column({ type: DataType.INTEGER, onDelete: 'CASCADE' })
  machineId: number;

  @BelongsTo(() => Machine)
  machine: Machine;

  @ForeignKey(() => Driver)
  @Column({ type: DataType.INTEGER, onDelete: 'CASCADE' })
  driverId: number;

  @BelongsTo(() => Driver)
  driver: Driver;
}
