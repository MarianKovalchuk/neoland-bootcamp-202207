const { connect, disconnect } = require('mongoose')
const { User, Note } = require('./models')

connect('mongodb://localhost:27017/postits')
    // .then(() => {
    //     return Promise.all([
    //         User.deleteMany(),
    //         Note.deleteMany()
    //     ])
    // })
    .then(() => Promise.all([User.deleteMany(), Note.deleteMany()]))
    .then(() => {
        const pepito = new User({
            name: 'Pepito Grillo',
            email: 'pepito@grillo.com',
            password: '123123123'
        })

        const wendy = new User({
            name: 'Wendy Darling',
            //email: 'wendy@darling.com',
            email: 'pepito@grillo.com',
            password: '12312123'
        })

        const peter = new User({
            name: 'Peter Pan',
            email: 'peter@pan.com',
            password: '123123123'
        })

        const james = new User({
            name: 'James Hook',
            email: 'james@hook.com',
            password: '123123123'
        })

        return Promise.all([
            pepito.save(),
            wendy.save(),
            peter.save(),
            james.save()
        ])
    })
    // .then(users => {
    //     const [pepito, wendy, peter, james] = users
    //     ...
    .then(([pepito, wendy, peter, james]) => {
        const note1 = new Note({ user: pepito.id, text: 'Hola, Pepito!' })
        const note2 = new Note({ user: wendy.id, text: 'Hola, Wendy!' })
        const note3 = new Note({ user: peter.id, text: 'Hola, Peter!' })
        const note4 = new Note({ user: james.id, text: 'Hola, James!' })

        return Promise.all([
            note1.save(),
            note2.save(),
            note3.save(),
            note4.save()
        ])
    })
    .catch(error => {
        debugger
    })
    .then(() => disconnect())