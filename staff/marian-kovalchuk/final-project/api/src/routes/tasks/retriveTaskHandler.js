const { runWithErrorHandling, createLogger, verifyToken } = require('../../utils')
const { tasks: { retrieveTasks } } = require('../../logic')
const logger = createLogger(module)

module.exports = (req, res) => {
    runWithErrorHandling(() => {
        const userId = verifyToken(req)

        return retrieveTasks(userId)
            .then(tasks => res.status(200).json(tasks))
    }, res, logger)
}