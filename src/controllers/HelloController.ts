import { Get, JsonController, Param } from 'routing-controllers'
import { Inject, Service } from 'typedi'
import { getCustomRepository } from 'typeorm'
import PersonRepository from '../repositories/TypeOrmPersonRepository'
import PersonService from '../services/PersonService'

/**
 * Example controller.
 */
@JsonController('/api')
@Service()
export default class HelloController {
  @Inject()
  private readonly service!: PersonService
  private readonly repository: PersonRepository

  constructor() {
    this.repository = getCustomRepository(PersonRepository)
  }

  /**
   * Example usage of person repository.
   */
  @Get('/person/:name')
  async personByName(@Param('name') name: string) {
    const data = await this.service.tryFind(this.repository, name)
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
      data: await this.service.find(this.repository)
    }
  }
}
