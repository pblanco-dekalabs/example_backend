import { Middleware, ExpressErrorMiddlewareInterface, HttpCode, Req, Res } from 'routing-controllers';
import { Service } from 'typedi';

@Service()
@Middleware({ type: 'after' })
export class ErrorHandler implements ExpressErrorMiddlewareInterface {
  error(error: any, @Req() request: any, @Res() response: any, next: (err: any) => any) {
    response.statusCode = 400
    return response.send({
      code: error.statusCode || 400,
      message: error.message
    })
    next(error)
  }
}