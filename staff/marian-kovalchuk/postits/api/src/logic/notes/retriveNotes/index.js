const { User, Note } = require('../../../models')
const { NotFoundError, SystemError } = require('../../../errors')
const { verifyObjectIdString } = require('../../../utils')

function retrieveNotes(userId) {
    verifyObjectIdString(userId, 'user id')

    return User.findById(userId).lean()
        .catch(error => {
            throw new SystemError(error.message)
        })
        .then(user => {
            if (!user) throw new NotFoundError(`user with id ${userId} not found`)

            return Note.find({ user: userId }, 'text visibility createdAt modifiedAt').lean()
                .catch(error => {
                    throw new SystemError(error.message)
                })
        })
        .then(notes => {
            notes.forEach(note => {
                // sanitize
                debugger

                note.id = note._id.toString()
                delete note._id

                delete note.__v
            })

            return notes
        })
}

module.exports = retrieveNotes