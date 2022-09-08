const { validateText } = require('validators')
const { verify } = require('jsonwebtoken')

const { JWT_SECRET } = process.env

function verifyToken(req) {
    const { headers: { authorization } } = req

    validateText(authorization, 'authorization')

    const token = authorization.substring(7)

    const payload = verify(token, JWT_SECRET)

    const { sub: userId } = payload

    return userId
}

module.exports = verifyToken