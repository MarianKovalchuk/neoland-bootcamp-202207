const mongoose = require('mongoose')

const { Schema, model, Types: { ObjectId } } = mongoose

const user = new Schema({
    name: {
        type: String,
        required: true
    },

    email: {
        type: String,
        required: true
    },

    password: {
        type: String,
        required: true
    }
})

const User = model('User', user)

const note = new Schema({
    user: {
        type: ObjectId,
        required: true,
        ref: 'User'
    },
    text: {
        type: String,
        default: ''
    }
})

const Note = model('Note', note)

mongoose.connect('mongodb+srv://marian:5d32a811@cluster0.pjhliet.mongodb.net/test')
    .then(() => User.deleteMany({}))
    .then(() => User.create({ name: 'Pepito Grillo', email: 'pepito@grillo.com', password: '123123123', hello: 'world' }))
    .then(user => {
        console.log('user', user)

        return Note.create({ user: user.id, text: 'hola mundo' })
    })
    .then(note => {
        console.log('note', note)

        return note.id
    })
    .then(noteId => Note.findById(noteId).populate('user'))
    .then(note => console.log('note', note))
    .then(() => mongoose.disconnect())
    .then(() => console.log('disconnected'))