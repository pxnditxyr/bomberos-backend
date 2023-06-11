import { Station } from 'src/stations/entities/station.entity';
import { Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';

@Entity( 'call_registers' )
export class CallRegister {
  @PrimaryGeneratedColumn( 'uuid' )
  id: string

  @Column( 'text' )
  affectedName: string

  @Column( 'text' )
  callAddress: string

  @Column( 'text' )
  description: string

  @Column( 'int' )
  affectedPhone: number

  @ManyToOne(
    () => Station,
    ( station ) => station.callRegisters,
    { onDelete: 'CASCADE', eager: true }
  )
  station: Station

  @Column( 'text', { array: true } )
  users: string[]

  @Column( 'bool', { default: true } )
  status: boolean

  @CreateDateColumn()
  createdAt: Date

  @UpdateDateColumn()
  updatedAt: Date
}
