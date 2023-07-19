import { Table, Model, Column, DataType, HasMany } from 'sequelize-typescript';
import { Builder } from 'src/builder/models/builder.modules';
import { Machine } from 'src/machine/models/machine.model';

interface CompanyAtr {
  name: string;
  adress: string;
  phone: string;
}

@Table({ tableName: 'company' })
export class Company extends Model<Company, CompanyAtr> {
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
  @Column({
    type: DataType.STRING,
  })
  address: string;

  @Column({
    type: DataType.STRING,
  })
  phone: string;

  @HasMany(() => Builder)
  builders: Builder[];

  @HasMany(() => Machine)
  machines: Machine[];
}
