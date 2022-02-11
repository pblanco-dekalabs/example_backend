import { Controller, Get, JsonController, Param, UseAfter } from 'routing-controllers'
import { Inject, Service } from 'typedi'
import { getCustomRepository } from 'typeorm'
import PersonRepository from '../repositories/PersonRepository'
import PersonRepositoryInterface from '../repositories/PersonRepositoryInterface'
import PersonService from '../services/PersonService'

@Service()
@JsonController('/api')
export default class HelloController {
  @Inject()
  private readonly service!: PersonService
  private readonly repository: PersonRepositoryInterface
  
  constructor() {
    this.repository = getCustomRepository(PersonRepository)
  }
  
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
  
  @Get('/hello')
  async hello() {
    throw new Error('No works')
  }
  
  @Get('/persons')
  async persons() {
    return {
      data: await this.service.find(this.repository)
    }
  }
}