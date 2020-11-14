import argon2 from 'argon2'
import { Controller, post } from './controller'
import { generateToken } from "../helpers/generate-token";
import { User, createUser, serializeUser } from "../models/User";


export class AuthController extends Controller {

  @post('/register')
  async register(ctx) {
    let { username, password } = ctx.request.body

    if (!username || !password) {
      ctx.body = { error: "Must provide username and password" }
      ctx.status = 400
      return
    }

    try {
      const user = createUser({
        username,
        password: await argon2.hash(password)
      })
      await user.save()

      ctx.body = { user: serializeUser(user) }
      ctx.status = 201

    } catch (error) {
      ctx.body = { error: "Username unavailable" }
      ctx.status = 400
    }
  }

  @post('/login')
  async login(ctx) {
    let { username, password } = ctx.request.body

    if (!username || !password) {
      ctx.body = { error: "Must provide username and password" }
      ctx.status = 400
      return
    }

    let user = await User.findOne({ username })

    if (!user || !await argon2.verify(user.password, password)) {
      ctx.body = { error: "Invalid Credentials" }
      ctx.status = 401
    }
    else {
      ctx.body = {
        user: serializeUser(user),
        token: generateToken(user)
      }
    }
  }
}
