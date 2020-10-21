import { Controller, get } from "./controller";


export class HomeController extends Controller {

  @get('/hi')
  async helloWorld(ctx) {
    ctx.body = {
      status: 'ok',
      message: 'hello, world!'
    }
  }
}
