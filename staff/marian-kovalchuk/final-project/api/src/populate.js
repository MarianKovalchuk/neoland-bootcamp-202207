const { connect, disconnect } = require('mongoose')
const { User, Task } = require('./models')

connect('mongodb+srv://marian:5d32a811@cluster0.pjhliet.mongodb.net/test2')
    .then(() => Promise.all([User.deleteMany(), Task.deleteMany()]))
    .then(() => {
        const pepito = new User({
            name: 'Pepito Grillo',
            email: 'pepito@grillo.com',
            password: '123123123'
        })

        const wendy = new User({
            name: 'Wendy Darling',
            email: 'wendy@darling.com',
            // email: 'pepito@grillo.com',
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
        const task1 = new Task
            ({
                user: pepito.id,
                text: 'Abrir las puertas',
                createdAt: '09/09/2029',
                progress: 'new',
                priority: 'low'
            })
        const task2 = new Task
            ({
                user: wendy.id,
                text: 'Read the alphabet!',
                createdAt: '19/09/2022',
                progress: 'in progress',
                priority: 'high'
            })
        const task3 = new Task({ user: peter.id, text: 'Plant a tree', createdAt: '03/03/2023', progress: 'new', priority: 'low' })
        const task4 = new Task({ user: james.id, text: 'probar la comida de Ucrania', createdAt: '03/09/2022', progress: 'done', priority: 'high' })

        return Promise.all([
            task1.save(),
            task2.save(),
            task3.save(),
            task4.save()
        ])


    })
    .catch(error => {
        console.error(error.message)
    })
    .then(() => disconnect())