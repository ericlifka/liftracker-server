import Koa from 'koa'
import jwt from 'koa-jwt'
import bodyParser from 'koa-bodyparser'
import koaStatic from 'koa-static'
import { createConnection } from "typeorm"

import { HomeController } from './controllers/home'
import { AuthController } from './controllers/auth'
import { UserController } from './controllers/user'


export async function startServer(port) {
  const app = new Koa()

  app.use(koaStatic('./static'))
  app.use(bodyParser())

  // open routes
  app.use(new AuthController().routes())

  // authed routes
  app.use(jwt({ secret: ':LDKfasdf' /* move */ }))
  app.use(new HomeController().routes())
  app.use(new UserController().routes())

  await createConnection()
  await app.listen(port)
}
