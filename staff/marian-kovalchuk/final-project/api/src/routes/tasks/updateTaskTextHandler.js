const { runWithErrorHandling, createLogger, verifyToken } = require('../../utils')
const { tasks: { updateTaskText } } = require('../../logic')
const logger = createLogger(module)

module.exports = (req, res) => {
    runWithErrorHandling(() => {
        const userId = verifyToken(req)

        const { body: { text }, params: { taskId } } = req

        return updateTaskText(userId, taskId, text)
            .then(() => res.status(204).send())
    }, res, logger)
}