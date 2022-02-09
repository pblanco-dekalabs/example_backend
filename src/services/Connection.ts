import { Service } from 'typedi'
import { Connection, createConnection } from 'typeorm'
import Person from '../domain/model/Person'

@Service()
export default class SqliteConnection {
  async connect(database: string): Promise<Connection> {
    return await createConnection({
      type: 'sqlite',
      database,
      entities: [Person],
      synchronize: true,
    })
  }
}