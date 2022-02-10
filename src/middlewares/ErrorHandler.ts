import * as Application from 'koa'

export async function handleErrors(
  ctx: Application.Context,
  next: Application.Next
) {
  try {
    await next()
  } catch (err) {
    ctx.status = 500
    ctx.body = { error: err.message, stack: err.stack }
    return
  }
  if (ctx.body == null) {
    ctx.body = {
      error: 'Not found',
    }
  }
}