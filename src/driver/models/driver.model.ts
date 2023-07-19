import {
  Table,
  Model,
  Column,
  DataType,
  BelongsToMany,
} from 'sequelize-typescript';
import { Machine } from 'src/machine/models/machine.model';
import { MachineDriver } from 'src/machine_driver/models/machine-driver.model';

interface driverAtr {
  first_name: string;
  last_name: string;
}

@Table({ tableName: 'driver' })
export class Driver extends Model<Driver, driverAtr> {
  @Column({
    type: DataType.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  })
  id: number;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  first_name: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  last_name: string;

  @BelongsToMany(() => Machine, () => MachineDriver)
  machines: Machine[];
}
