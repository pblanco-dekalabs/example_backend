import './InjectContainers'
import * as Application from 'koa'
import Entry from 'ts-entry-point'
import { useKoaServer } from 'routing-controllers'
import Connection from './services/Connection'
import Container from 'typedi'
import { customError } from './infrastructure/errors'
/**
 * Main class.
 * This class serves as implementation-specific provider for
 * the underlying framework.
 */
@Entry
export default class Main {
  /**
   * Entry point.
   */
  static async main(args: string[]) {
    const { app } = await this.setup()
    // Starts the server
    app.listen(this.port, this.done)
  }

  static readonly port = 3001

  private static done() {
    console.log(`Listening on port ${Main.port}!`)
    console.log(`Go and test the API!`)
    console.log(
      `The typical programmer hello world  : http://localhost:3001/api/hello`
    )
    console.log(
      `Example of multiple entities listed : http://localhost:3001/api/persons`
    )
    console.log(
      `Example of repository with a result : http://localhost:3001/api/person/John%20Doe`
    )
    console.log(
      `Example of repository without result: http://localhost:3001/api/person/Not%20John%20Doe`
    )
  }
  private static async handleErrors(
    ctx: Application.Context,
    next: Application.Next
  ) {
    try {
      await next()
    } catch (error) {
      ctx.status = error.statusCode || 500
      ctx.body = customError(error)
      return
    }
    if (ctx.body == null) {
      ctx.status = 404
      ctx.body = {
        message: 'Not found',
      }
    }
  }
  private static async setup() {
    const connectionService = Container.get(Connection)
    const connection = connectionService.connect('my-database.db')
    const app = new Application()
    app.use(this.handleErrors)
    useKoaServer(app, {
      defaultErrorHandler: false,
      controllers: [`${__dirname}/controllers/*.ts`],
    })
    return { app, connection }
  }
}
