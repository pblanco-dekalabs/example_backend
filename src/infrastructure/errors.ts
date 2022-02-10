export function customError (error: any) {
  console.log('......')
  return { 
    status: 'ko',
    message: error.message,
    code: error.statusCode || 500,
    stack: error.stack
  }
}