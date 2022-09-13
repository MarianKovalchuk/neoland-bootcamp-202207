const { Schema, Types: { ObjectId } } = require('mongoose')

const task = new Schema({
    user: {
        type: ObjectId,
        required: true,
        ref: 'User'
    },

    text: {
        type: String,
    },

    priority: {
        type: String,
        enum: ['high', 'medium', 'low' ],
    },

    createAt: {
        type: Date,
        default: Date.now
    },

    progress: {
        type: String,
        enum: ['new', 'in progress', 'done']
    }
})

module.exports = task