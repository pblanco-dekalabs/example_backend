import { Service } from 'typedi'

@Service()
export default class ExampleService {
  async sum(left: number, right: number): Promise<number>
  async sum(left: string, right: string): Promise<string>
  async sum(left: any, right: any) {
    return left + right
  }
}
