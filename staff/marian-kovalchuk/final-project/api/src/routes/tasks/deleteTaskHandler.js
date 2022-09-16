const { runWithErrorHandling, createLogger, verifyToken } = require('../../utils')
const { tasks: { deleteTask } } = require('../../logic')
const logger = createLogger(module)

module.exports = (req, res) => {
    runWithErrorHandling(() => {
        const userId = verifyToken(req)

        const { params: { taskId } } = req

        return deleteTask(userId, taskId)
            .then(() => res.status(204).send())
    }, res, logger)
}