import Router from '@koa/router'


const def = str => str || ""
const buildUrl = (root, prefix, url) => (def(root) + def(prefix) + def(url)) || "/"

export class Controller {

  router: Router
  prefix: string

  constructor(public rootPrefix: string) {
    this.router = new Router()
  }

  routes() {
    console.log(`\n${this.constructor.name} attaching urls:`)

    for (let prop in this) {
      const handler: Function | unknown = this[prop]
      if ( handler &&
           typeof handler === 'function' &&
           handler['actionParams'] )
      {
        const { url, method } = handler['actionParams']
        const  fullUrl = buildUrl(this.rootPrefix, this.prefix, url)
        this.router[method](fullUrl, (...args) => {
          console.log(`${method.toUpperCase()}:${fullUrl} - ${this.constructor.name}:${prop}()`)
          handler.call(this, ...args)
        })

        console.log(`  ${method.toUpperCase()}:${fullUrl}`)
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
