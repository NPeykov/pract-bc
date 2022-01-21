
function extractToken(request, response, next) {
  const authorization = request.get('authorization')
  if(authorization && authorization.toLowerCase().startsWith('bearer ')) {
    const token = authorization.split(' ')[1]
    request.token = token
  }
  next()
}

module.exports = extractToken