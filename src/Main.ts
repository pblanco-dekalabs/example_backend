import './InjectContainers'
import * as Application from 'koa'
import Entry from 'ts-entry-point'
import { useKoaServer } from 'routing-controllers'
import Container from 'typedi'

import Connection from './services/Connection'
import { handleErrors } from './middlewares/handleErrors'

@Entry
export default class Main {
  static async main(args: string[]) {
    const { app } = await this.setup()
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
  
  private static async setup() {
    const connectionService = Container.get(Connection)
    const connection = connectionService.connect('my-database.db')
    const app = new Application()
    app.use(handleErrors)
    useKoaServer(app, {
      defaultErrorHandler: false,
      controllers: [`${__dirname}/controllers/*.ts`],
    })
    return { app, connection }
  }
}
