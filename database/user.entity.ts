import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
  OneToOne,
  JoinColumn
} from "typeorm";

@Entity("users")
export class UserEntity {
  @PrimaryGeneratedColumn("uuid")
  id!: string;

  @Column({ type: "varchar", unique: true })
  username!: string;

  @Column({ type: "varchar", unique: true })
  email!: string;

  @Column({ type: "varchar", unique: true })
  phoneNumber: string;

  @Column({ type: "varchar", nullable: false })
  password!: string;

  @Column({ type: "text", nullable: true })
  image!: string;

  @Column({ type: "varchar", nullable: false })
  type!: "student" | "staff";

  @Column({ type: "simple-array" })
  role: string[];

  @OneToOne("StudentEntity", "user", {
    nullable: true,
    cascade: true
  })
  @JoinColumn({ name: "student_id" })
  student?: any;

  @OneToOne("StaffEntity", "user", {
    nullable: true,
    cascade: true
  })
  @JoinColumn({ name: "staff_id" })
  staff?: any;
}
