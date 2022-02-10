import './InjectContainers'
import * as Application from 'koa'
import Entry from 'ts-entry-point'
import { createKoaServer, useKoaServer } from 'routing-controllers'
import { createConnection } from 'typeorm'
import HelloController from './controllers/HelloController'
import Person from './domain/model/Person'

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
    // Example usage of the ORM
    if ((await Person.count()) <= 0) {
      const person = new Person()
      person.name = 'John Doe'
      person.birthDate = new Date('10/10/1995')
      Person.save(person)
    }
    const n = await Person.count()
    console.log(`Got ${n} record(s):`)
    console.log(await Person.find())
    // Starts the server
    app.listen(this.port, this.done)
  }

  static readonly port = 3001

  // Called once the setup is done.
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
    } catch (err) {
      ctx.status = 500
      ctx.body = { error: err.message, stack: err.stack }
      return
    }
    if (ctx.body == null) {
      ctx.body = {
        error: 'Not found',
      }
    }
  }

  // Simple DB and server setup.
  private static async setup() {
    // Create the connection, this should be read from configurable sources.
    const connection = await createConnection({
      type: 'sqlite',
      database: 'my-database.db',
      entities: [Person],
      synchronize: true,
    })
    // Setup controllers of the application. This could be provided by an abstract provider.
    // const app: Application =
    const app = new Application()
    app.use(this.handleErrors)
    useKoaServer(app, {
      controllers: [HelloController],
    })
    return { app, connection }
  }
}
