import { Get, JsonController, Param } from 'routing-controllers'
import { Inject, Service } from 'typedi'
import { getCustomRepository } from 'typeorm'
import Person from '../domain/model/Person'
import PersonRepository from '../repositories/PersonRepository'
import ExampleService from '../services/ExampleService'

/**
 * Example controller.
 */
@JsonController('/api')
@Service()
export default class HelloController {
  @Inject()
  private readonly service!: ExampleService
  private readonly repository: PersonRepository

  constructor() {
    this.repository = getCustomRepository(PersonRepository)
  }

  /**
   * Example usage of person repository.
   */
  @Get('/person/:name')
  async personByName(@Param('name') name: string) {
    const data = await this.repository.tryFind(name)
    return {
      meta: {
        'was found?': data.isDefined(),
        mnemonic: data.isDefined()
          ? `Some[${data.get().constructor.name}]`
          : `None`,
      },
      data,
    }
  }

  /**
   * Example route.
   */
  @Get('/hello')
  async hello() {
    return {
      hello: 'world',
    }
  }

  /**
   * Example usage of simple ORM.
   */
  @Get('/persons')
  async persons() {
    return {
      data: await Person.find(),
      meta: {
        '2 + 3': await this.service.sum(2, 3),
        '"a" + "b"': await this.service.sum('a', 'b'),
      },
    }
  }
}
