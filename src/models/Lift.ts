import { BaseEntity, Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm"
import { User } from "./User"

@Entity()
export class Lift extends BaseEntity {

  @PrimaryGeneratedColumn()
  id: number

  @Column()
  name: string

  @Column()
  max: number

  @Column()
  increment: number

  @ManyToOne(() => User, user => user.lifts)
  user: User

}

export const createLift = ({name, max, increment, user}) => {
  let lift = new Lift()

  lift.name = name
  lift.max = max
  lift.increment = increment
  lift.user = user

  return lift
}

export const serializeLift = lift => ({
  id: lift.id,
  name: lift.name,
  max: lift.max,
  increment: lift.increment,
  user: lift.user.id
})
