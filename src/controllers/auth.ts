import argon2 from 'argon2'
import { Controller, post } from './controller'
import { generateToken } from "../helpers/generate-token";
import { User } from "../models/User";


export class AuthController extends Controller {

  @post('/register')
  async register(ctx) {
    let { username, password } = ctx.request.body
    let hashedPass = await argon2.hash(password)

    const user = new User()
    user.username = username
    user.password = hashedPass

    try {
      await user.save()

      ctx.body = { user: user.serialize() }
      ctx.status = 201

    } catch (error) {
      ctx.body = { error }
      ctx.status = 400
    }
  }

  @post('/login')
  async login(ctx) {
    let { username, password } = ctx.request.body
    let user = await User.findOne({ username })

    if (!user || !await argon2.verify(user.password, password)) {
      ctx.body = { error: "Invalid Credentials" }
      ctx.status = 401
    }
    else {
      ctx.body = {
        user: user.serialize(),
        token: generateToken(user)
      }
    }
  }
}
