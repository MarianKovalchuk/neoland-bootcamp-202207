const mongodb = require('mongodb')

const { MongoClient } = mongodb

const client = new MongoClient('mongodb+srv://marian:<password>@cluster0.pjhliet.mongodb.net/test')

client.connect()
    .then(connection => {
        const db = connection.db('postits')

        const users = db.collection('users')

        return users.deleteMany({})
            .then(result => {
                console.log('delete many', result)

                //throw new Error('wtf')

                return users.insertOne({
                    name: 'James Hook 2',
                    email: 'james@hook.com',
                    password: '123123123'
                })
                    .then(result => {
                        console.log('insert one', result)

                        //throw new Error('wtf')

                        return connection.close()
                            .then(() => console.log('disconnected'))
                    })
            })
    })
    .catch(error => {
        console.error('ERROR', error)
    })
