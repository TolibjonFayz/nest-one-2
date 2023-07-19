import { Table, Model, Column, DataType } from 'sequelize-typescript';

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
    unique: true,
  })
  first_name: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
    unique: true,
  })
  last_name: string;
}
