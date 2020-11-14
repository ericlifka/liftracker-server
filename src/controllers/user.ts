import { Controller, get } from "./controller"
import { User } from "../models/User"


export class UserController extends Controller {

  @get('/user')
  async find(ctx) {
    let id = ctx.state.user.data.id
    let user = await User.findOne(id)

    ctx.body = { user: user.serialize() }
  }
}
