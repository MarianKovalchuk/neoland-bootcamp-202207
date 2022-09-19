const { NotFoundError, AuthError } = require("errors")
const { User, Task } = require("../../../models")
const { verifyObjectIdString } = require("../../../utils")
const { validateString } = require("validators")

function updateTaskText(userId, taskId, text) {
    verifyObjectIdString(userId)
    verifyObjectIdString(taskId)
    validateString(text)

    return User.findById(userId)
        .then(user => {
            if (!user) throw new NotFoundError(`user with id ${userId} not found`)

            return Task.findById(taskId)
        })
        .then(task => {
            if (!task) throw new NotFoundError(`task with id ${taskId} not found`)

            if(task.user.toString() !== userId) throw new AuthError(`task with id ${taskId} does not belong to user with id ${userId}`)

            task.text = text
            task.modifiedAt = Date.now()

            return task.save()
        })
        .then(() => {})
}

module.exports = updateTaskText