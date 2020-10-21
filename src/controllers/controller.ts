import Router from '@koa/router'


const def = str => str || ""
const buildUrl = (prefix, url) => (def(prefix) + def(url)) || "/"

export class Controller {

  router: Router
  prefix: string

  constructor() {
    this.router = new Router()
  }

  routes() {
    for (let prop in this) {
      const handler: Function | unknown = this[prop]
      if ( handler &&
           typeof handler === 'function' &&
           handler['actionParams'] )
      {
        const { url, method } = handler['actionParams']
        this.router[method](buildUrl(this.prefix, url), handler.bind(this))
      }
    }

    return this.router.routes()
  }
}

function actionDecorator(method) {
  return (url?) =>
    (target, prop, descriptor) => {
      target[prop].actionParams = { url, method }
    }
}

export const post = actionDecorator('post')
export const get = actionDecorator('get')
export const put = actionDecorator('put')
export const patch = actionDecorator('patch')
export const del = actionDecorator('del')

export const action = (url?) =>
  (target, prop, descriptor) => {
    target[prop].actionParams = {url, method: prop.toLowerCase()}
  }
