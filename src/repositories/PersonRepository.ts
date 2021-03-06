import { EntityRepository, Repository } from 'typeorm'
import Person from '../domain/model/Person'
import { none, option, some } from '@octantis/option'

// Helper type
export type Future<T> = Promise<option<T>>

// Example of custom repository
@EntityRepository(Person)
export default class PersonRepository extends Repository<Person> {
  // Simple custom method
  async tryFind(name: string): Future<Person> {
    const person = await this.findOne({ name })
    if (person != null) {
      return some(person)
    }
    return none()
  }
}
