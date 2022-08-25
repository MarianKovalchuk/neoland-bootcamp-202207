const mongoose = require('mongoose')

const { Schema, model, Types: { ObjectId } } = mongoose

const card = new Schema({
    name: {
        type: String,
        required: true
    },

    number: {
        type: String,
        required: true
    },

    expirity: {
        type: Date,
        required: true
    },

    cvv: {
        type: String,
        required: true
    }
})

const Card = model('Card', card)

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
    },

    cards: [card] // embedding
})

const User = model('User', user)

const note = new Schema({
    user: { // linking
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

mongoose.connect('mongodb+srv://marian:<password>@cluster0.pjhliet.mongodb.net/test')
    //.then(() => User.deleteMany({}))
    //.then(() => Note.deleteMany({}))
    .then(() => Promise.all([User.deleteMany({}), Note.deleteMany({})]))
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
    .then(note => {
        console.log('note', note)

        return note.user._id
    })
    .then(userId => User.findById(userId))
    .then(user => {
        const card1 = new Card({ name: 'Pepito Grillo', number: '0012 3400 5600 7800', expirity: new Date, cvv: '001' })
        const card2 = new Card({ name: 'Pepito Grillo', number: '0098 7600 6500 2100', expirity: new Date, cvv: '002' })

        user.cards.push(card1, card2)

        return user.save()
    })
    .then(user => console.log('user', user))
    .then(() => mongoose.disconnect())
    .then(() => console.log('disconnected'))