import Person from '../domain/model/Person'
import { option } from '@octantis/option'
import { Service } from 'typedi'
import TypeOrmPersonRepository from './TypeOrmPersonRepository'
import { getCustomRepository } from 'typeorm'

// Helper type
export type Future<T> = Promise<option<T>>

// Example of custom repository
@Service()
export default class PersonRepositoryAdapter {
  private typeormrepo = getCustomRepository(TypeOrmPersonRepository)
  // Simple custom method
  async tryFind(name: string): Future<Person> {
    return this.typeormrepo.tryFind(name)
  }
}