import { Controller, get, post, put } from "./controller"
import { Lift, createLift, serializeLift } from '../models/Lift'
import { User } from '../models/User'

export class LiftController extends Controller {

  @get('/lift')
  async findAll(ctx) {
    let { id } = ctx.state.user.data
    let user = await User.findOne(id, { relations: ['lifts']})

    ctx.body = {
      lifts: user.lifts.map(serializeLift)
    }
  }

  @get('/lift/:id')
  async find(ctx) {
    let { id } = ctx.params
    let lift = await Lift.findOne(id)

    ctx.body = { lift: serializeLift(lift) }
  }

  @post('/lift')
  async create(ctx) {
    let { name, max, increment } = ctx.request.body
    let { id } = ctx.state.user.data

    if (!name || !max || !increment) {
      ctx.body = { error: "Must provide name, max, & increment" }
      ctx.status = 400
      return
    }

    try {
      let user = await User.findOne(id)
      let lift = createLift({name, max, increment, user})
      await lift.save()

      ctx.body = { lift: serializeLift(lift) }
      ctx.status = 201

    } catch (error) {
      ctx.body = { error }
      ctx.body = 400
    }
  }

  @put('/lift/:id')
  async update(ctx) {
    let { id } = ctx.params
    let { name, max, increment } = ctx.request.body

    if (!id || !name || !max || !increment) {
      ctx.body = { error: "Must provide id, name, max, & increment" }
      ctx.status = 400
      return
    }

    let lift = await Lift.findOne(id)

    if (!lift) {
      ctx.status = 404
      return
    }

    lift.name = name
    lift.max = max
    lift.increment = increment
    await lift.save()

    ctx.body = { lift: serializeLift(lift) }
  }
}
