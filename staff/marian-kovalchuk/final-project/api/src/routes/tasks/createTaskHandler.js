const { runWithErrorHandling, createLogger, verifyToken } = require('../../utils')
const { tasks: { createTask } } = require('../../logic')
const logger = createLogger(module)

module.exports = (req, res) => {
    runWithErrorHandling(() => {
        const userId = verifyToken(req)

        const { body: { text } } = req

        return createTask(userId, text)
            .then(() => res.status(201).send())
    }, res, logger)
}