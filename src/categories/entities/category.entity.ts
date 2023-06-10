import { Article } from 'src/articles/entities/article.entity';
import { User } from 'src/auth/entities/user.entity';
import { BeforeInsert, BeforeUpdate, Column, CreateDateColumn, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';

@Entity( 'categories' )
export class Category {
  @PrimaryGeneratedColumn( 'uuid' )
  id: string

  @Column( 'text', { unique: true } )
  name: string

  @Column( 'text', { nullable: true } )
  description: string

  @OneToMany(
    () => Article,
    ( article ) => article.category,
    { cascade: true, eager: true }
  )
  article: Article[]

  @ManyToOne(
    () => User,
    ( user ) => user.category,
    { eager: true }
  )
  user: User

  @Column( 'bool', { default: true } )
  status: boolean

  @CreateDateColumn()
  createdAt: Date

  @UpdateDateColumn()
  updatedAt: Date

  @BeforeInsert()
  checkFieldsBeforeInsert () {
    this.name = this.name.trim().toLowerCase()
    this.description = this.description.trim()
  }

  @BeforeUpdate()
  checkFieldsBeforeUpdate () {
    this.checkFieldsBeforeInsert()
  }
}
