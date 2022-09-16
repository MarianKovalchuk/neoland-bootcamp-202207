require('dotenv').config()

const { User, Task } = require('../../../models')
const { NotFoundError, SystemError } = require('errors')
const { validateText } = require('validators')
const { verifyObjectIdString } = require('../../../utils')

/**
 * Creates a task for a user.
 * 
 * @param {string} userId The user id.
 * @param {string} text The task text.
 * 
 * @returns {Promise}
 *
 * @throws {TypeError} If any of the arguments does not match the expected type.
 * @throws {FormatError} If any of the arguments does not match the expected format.
 * 
 * @throws {NotFoundError} If the user is not found.
 * @throws {SystemError} If an error happens in db.
 */
function createTask(userId, text, priority) {
    verifyObjectIdString(userId, 'user id')
    validateText(text)
    if (priority) validateText(priority)

    return User.findById(userId).lean()
        .catch(error => {
            throw new SystemError(error.message)
        })
        .then(user => {
            if (!user) throw new NotFoundError(`user with id ${userId} not found`)

            return Task.create({ user: user._id, text, priority })
                .catch(error => {
                    throw new SystemError(error.message)
                })
        })
        .then(task => { })
}

module.exports = createTask