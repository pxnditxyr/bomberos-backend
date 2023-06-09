import { BeforeInsert, BeforeUpdate, Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';
import { CivilStatus } from '../interfaces/valid-civil-status.interface';
import { Gender } from '../interfaces/valid-genders.interface';
import { ValidRoles } from '../interfaces/valid-roles.interface';



Entity( 'users' )
export class User {
  @PrimaryGeneratedColumn( 'uuid' )
  id: string

  @Column( 'text' )
  name: string

  @Column( 'text' )
  lastName: string

  @Column( 'int' )
  phone: number

  @Column( 'int' )
  dni: number

  @Column( 'enum', { enum: CivilStatus, default: CivilStatus.SINGLE } )
  civilStatus: CivilStatus

  @Column( 'enum', { enum: Gender, default: Gender.MALE } )
  gender: Gender

  @Column( 'date' )
  birthDate: Date

  @Column( 'text', { unique: true } )
  email: string

  @Column( 'text' )
  password: string

  @Column( 'enum', { enum: ValidRoles, default: ValidRoles.USER })
  role: ValidRoles

  @Column( 'bool', { default: false } )
  status: boolean;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @BeforeInsert()
  checkFieldsBeforeInsert() {
    this.name = this.name.trim()
    this.lastName = this.lastName.trim()

    this.email = this.email.trim().toLowerCase()
  }

  @BeforeUpdate()
  checkFieldsBeforeUpdate () {
    this.checkFieldsBeforeInsert()
  }
}
