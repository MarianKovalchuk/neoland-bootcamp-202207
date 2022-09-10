const { runWithErrorHandling, createLogger, verifyToken } = require('../../utils')
const { tasks: { searchTasks } } = require('../../logic')
const logger = createLogger(module)

module.exports = (req, res) => {
    runWithErrorHandling(() => {
        const userId = verifyToken(req)

        const { query: { q: query }} = req

        return searchTasks(userId, query)
            .then(tasks => res.status(200).json(tasks))
    }, res, logger)
}