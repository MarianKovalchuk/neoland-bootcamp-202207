const { NotFoundError } = require('errors')
const { User, Task } = require('../../../models')

function deleteTask(userId, taskId) {
    //TODO INPUT VALIDATIONS

    return (async () => {
        const user = await User.findById(userId)

        if(!user) throw new NotFoundError(`User with ID ${userId} not found`)

        const task = await Task.findOne({user: userId, _id: taskId})

        if(!task) throw new NotFoundError(`Task with id ${taskId} not found`)

        await Task.deleteOne({_id: taskId})

    })()

}

module.exports = deleteTask