import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm'

@Entity()
export default class Person {
  @PrimaryGeneratedColumn()
  id: number

  @Column()
  name: string

  @Column()
  birthDate: Date
}
