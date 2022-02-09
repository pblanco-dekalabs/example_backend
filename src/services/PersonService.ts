import { option } from '@octantis/option'
import { Service } from 'typedi'
import Person from '../domain/model/Person'
import PersonRepository from '../repositories/TypeOrmPersonRepository'

@Service()
export default class PersonService {
  async tryFind(repository: PersonRepository, name: string): Promise<option<Person>> {
    return await repository.tryFind(name)
  }
  async find(repository: PersonRepository): Promise<Person[]> {
    return await repository.find()
  }
  async sum(left: any, right: any) {
    return left + right
  }
}