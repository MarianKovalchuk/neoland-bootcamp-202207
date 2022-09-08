const { runWithErrorHandling, createLogger } = require('../../utils')
const { users: { authenticateUser } } = require('../../logic')
const { sign } = require('jsonwebtoken')
const logger = createLogger(module)
const { JWT_SECRET, JWT_EXP } = process.env

module.exports = (req, res) => {
    runWithErrorHandling(() => {
        const { body: { email, password } } = req

        return authenticateUser(email, password)
            .then(userId => {
                const token = sign({ sub: userId }, JWT_SECRET, { expiresIn: JWT_EXP })

                res.json({ token })
            })
    }, res, logger)
}