import { BaseEntity, Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm"
import { Lift } from "./Lift"

@Entity()
export class User extends BaseEntity {

  @PrimaryGeneratedColumn()
  id: number

  @Column({ unique: true })
  username: string

  @Column()
  password: string

  @OneToMany(() => Lift, lift => lift.user)
  lifts: Lift[]

  serialize() {
    return {
      id: this.id,
      username: this.username
    }
  }
}
