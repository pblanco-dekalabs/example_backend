import { option } from '@octantis/option'
import { Service } from 'typedi'
import Person from '../domain/model/Person'
import PersonRepositoryInterface from '../repositories/PersonRepositoryInterface'

@Service()
export default class PersonService {
  async tryFind(repository: PersonRepositoryInterface, name: string): Promise<option<Person>> {
    return await repository.tryFind(name)
  }
  async find(repository: PersonRepositoryInterface): Promise<Person[]> {
    return await repository.find()
  }
  async sum(left: any, right: any) {
    return left + right
  }
}
