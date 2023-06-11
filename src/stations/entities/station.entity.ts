import { CallRegister } from 'src/call-registers/entities/call-register.entity';
import { BeforeInsert, BeforeUpdate, Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';

@Entity( 'stations' )
export class Station {
  @PrimaryGeneratedColumn( 'uuid' )
  id: string

  @Column( 'text', { unique: true } )
  name: string

  @Column( 'text', { nullable: true } )
  address: string

  @Column( 'int', { nullable: true } )
  phone: number

  @Column( 'text', { nullable: true } )
  email: string

  @OneToMany(
    () => CallRegister,
    ( callRegister ) => callRegister.station,
  )
  callRegisters: CallRegister

  

  @Column( 'bool', { default: true } )
  status: boolean

  @CreateDateColumn()
  createdAt: Date

  @UpdateDateColumn()
  updatedAt: Date

  @BeforeInsert()
  checkInsertFields () {
    this.name = this.name.trim().toLowerCase()
    this.email = this.email.trim().toLowerCase()
  }

  @BeforeUpdate()
  checkUpdateFields () {
    this.checkInsertFields()
  }
}
