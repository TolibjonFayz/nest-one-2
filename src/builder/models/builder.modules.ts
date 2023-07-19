import {
  Table,
  Model,
  Column,
  DataType,
  ForeignKey,
  BelongsTo,
} from 'sequelize-typescript';
import { Company } from 'src/company/models/company.model';

interface builderAtr {
  full_name: string;
  birth_day: Date;
  salary: number;
  companyId: number;
}

@Table({ tableName: 'builder' })
export class Builder extends Model<Builder, builderAtr> {
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
  full_name: string;

  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  salary: number;

  // @Column({
  //   type: DataType.INTEGER,
  //   allowNull: false,
  // })
  // companyId: number;

  @ForeignKey(() => Company)
  @Column({
    type: DataType.INTEGER,
    onDelete: 'CASCADE',
  })
  companyId: number;

  @BelongsTo(() => Company)
  company: Company;
}
