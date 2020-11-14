import Koa from 'koa'
import jwt from 'koa-jwt'
import bodyParser from 'koa-bodyparser'
import koaStatic from 'koa-static'
import { createConnection } from "typeorm"

import { HomeController } from './controllers/home'
import { AuthController } from './controllers/auth'
import { UserController } from './controllers/user'
import { LiftController } from './controllers/lift'

const apiPrefix = '/api'

export async function startServer(port) {
  const app = new Koa()

  app.use(koaStatic('./static'))
  app.use(bodyParser())

  // open routes
  app.use(new AuthController(apiPrefix).routes())
  app.use(new HomeController(apiPrefix).routes())

  // authed routes
  app.use(jwt({ secret: ':LDKfasdf' /* move */ }))
  app.use(new UserController(apiPrefix).routes())
  app.use(new LiftController(apiPrefix).routes())

  await createConnection()
  await app.listen(port)
}
