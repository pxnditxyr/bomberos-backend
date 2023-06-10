import { Article } from 'src/articles/entities/article.entity';
import { Category } from 'src/categories/entities/category.entity';
import { BeforeInsert, BeforeUpdate, Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';
import { CivilStatus } from '../interfaces/valid-civil-status.interface';
import { Gender } from '../interfaces/valid-genders.interface';

@Entity( 'users' )
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

  @Column( 'text', { array: true, default: [ 'user' ] } )
  role: string[]

  @OneToMany(
    () => Article,
    ( article ) => article.user,
  )
  article: Article
  
  @OneToMany(
    () => Category,
    ( category ) => category.user,
  )
  category: Category

  @Column( 'bool', { default: true } )
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
