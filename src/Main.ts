import './InjectContainers'
import * as Application from 'koa'
import Entry from 'ts-entry-point'
import { createKoaServer } from 'routing-controllers'
import HelloController from './controllers/HelloController'
import Connection from './services/Connection'
import Container from 'typedi'
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

  // Simple DB and server setup.
  private static async setup() {
    // Create the connection, this should be read from configurable sources.
    const connectionService = Container.get(Connection)
    const connection = connectionService.connect('my-database.db')
    // Setup controllers of the application. This could be provided by an abstract provider.
    const app: Application = createKoaServer({
      controllers: [HelloController],
    })
    return { app, connection }
  }
}
