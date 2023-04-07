import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity("leads")
class Lead {
  @PrimaryGeneratedColumn()
  leadId!: number;

  @Column("text")
  firstName!: string;

  @Column("text")
  lastName!: string;

  @Column("text")
  phone!: string;

  @Column("text")
  email!: string;
}

export { Lead }