const { User, Task } = require('../../../models')
const { NotFoundError, SystemError } = require('../../../errors')
const { verifyObjectIdString } = require('../../../utils')

function retrieveTasks(userId) {
    verifyObjectIdString(userId, 'user id')

    return User.findById(userId).lean()
        .catch(error => {
            throw new SystemError(error.message)
        })
        .then(user => {
            if (!user) throw new NotFoundError(`user with id ${userId} not found`)

            return Task.find({ user: userId }, 'text visibility createdAt modifiedAt').lean()
                .catch(error => {
                    throw new SystemError(error.message)
                })
        })
        .then(tasks => {
            tasks.forEach(task => {
                // sanitize
                debugger

                task.id = task._id.toString()
                delete task._id

                delete task.__v
            })

            return tasks
        })
}

module.exports = retrieveTasks