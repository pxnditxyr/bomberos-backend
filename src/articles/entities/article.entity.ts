import { User } from 'src/auth/entities/user.entity';
import { Category } from 'src/categories/entities/category.entity';
import { BeforeInsert, BeforeUpdate, Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';

@Entity( 'articles' )
export class Article {
  @PrimaryGeneratedColumn( 'uuid' )
  id: string

  @Column( 'text' )
  name: string

  @Column( 'text', { nullable: true } )
  description: string

  @Column( 'float', { default: 0.0 } )
  price: number

  @Column( 'int', { default: 0 } )
  stock: number

  @Column( 'text', { unique: true } )
  code: string

  @ManyToOne(
    () => Category,
    ( category ) => category.article,
    { onDelete: 'CASCADE' }
  )
  category: Category

  @Column( 'text' )
  categoryId: string

  @ManyToOne(
    () => User,
    ( user ) => user.article,
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
  checkUniqueFields () {
    this.code = this.code.toUpperCase().trim()
  }

  @BeforeUpdate()
  checkUniqueFieldsOnUpdate () {
    this.checkUniqueFields()
  }
}
