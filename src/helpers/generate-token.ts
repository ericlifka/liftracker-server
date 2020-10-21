import jwt from 'jsonwebtoken'


export function generateToken(user) {
  let data = {
    id: user.id,
    username: user.username
  }

  let signature = ':LDKfasdf' // move
  let expiresIn = '6h'

  return jwt.sign({ data }, signature, { expiresIn })
}
