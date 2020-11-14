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

}

export const createUser = ({ username, password }) => {
  let user = new User()

  user.username = username
  user.password = password

  return user
}

export const serializeUser = user => ({
  id: user.id,
  username: user.username
})
