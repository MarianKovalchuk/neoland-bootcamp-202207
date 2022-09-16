require('dotenv').config()

const { NotFoundError, AuthError } = require('errors')
const { User, Task } = require('../../../models')

function deleteTask(userId, taskId) {
    //TODO INPUT VALIDATIONS

    return (async () => {
        const user = await User.findById(userId)

        if(!user) throw new NotFoundError(`User with ID ${userId} not found`)

        const task = await Task.findById(taskId)

        if(!task) throw new NotFoundError(`Task with id ${taskId} not found`)

        if (task.user.toString() !== userId) throw new AuthError(`User with ID ${userId} is not the owner of Task with ID ${taskId}`)

        await Task.deleteOne({_id: taskId})
    })()

}

module.exports = deleteTask