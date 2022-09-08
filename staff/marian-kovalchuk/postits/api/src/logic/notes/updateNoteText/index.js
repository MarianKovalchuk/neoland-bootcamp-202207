const { NotFoundError, AuthError } = require("errors")
const { User, Note } = require("../../../models")
const { verifyObjectIdString } = require("../../../utils")
const { validateString } = require("validators")

function updateNoteText(userId, noteId, text) {
    verifyObjectIdString(userId)
    verifyObjectIdString(noteId)
    validateString(text)

    return User.findById(userId)
        .then(user => {
            if (!user) throw new NotFoundError(`user with id ${userId} not found`)

            return Note.findById(noteId)
        })
        .then(note => {
            if (!note) throw new NotFoundError(`note with id ${noteId} not found`)

            if(note.user.toString() !== userId) throw new AuthError(`note with id ${noteId} does not belong to user with id ${userId}`)

            note.text = text
            note.modifiedAt = Date.now()

            return note.save()
        })
        .then(() => {})
}

module.exports = updateNoteText