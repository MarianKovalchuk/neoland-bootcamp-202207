const { User } = require('../../../models')
const { NotFoundError, SystemError } = require('errors')
const { verifyObjectIdString } = require('../../../utils')

function retrieveUser(userId) {
    verifyObjectIdString(userId, 'user id')

    return User.findById(userId, 'name email').lean()
        .catch(error => {
            throw new SystemError(error.message)
        })
        .then(user => {
            if (!user) throw new NotFoundError(`user with id ${userId} not found`)

            // sanitize
            delete user._id

            return user
        })
}

module.exports = retrieveUser