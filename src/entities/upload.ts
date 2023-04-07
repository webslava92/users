import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity('uploads')
class Upload {

  @PrimaryGeneratedColumn()
  upload_id!: number;

  @Column("double")
  entries!: number;

}

export { Upload }