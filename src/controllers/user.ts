import { Controller, get } from "./controller";
import { User } from "../models/User";


export class UserController extends Controller {

  prefix = '/user'

  @get('/:id')
  async find(ctx) {
    const { id } = ctx.params
    const user = await User.findOne(id)

    if (!user) {
      ctx.status = 404
    }
    else {
      ctx.body = { user: user.serialize() }
    }
  }
}
