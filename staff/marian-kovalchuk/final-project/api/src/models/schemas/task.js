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

    status: {
        type: String,
        enum: ['todo', 'doing', 'done']
    }
})

module.exports = task