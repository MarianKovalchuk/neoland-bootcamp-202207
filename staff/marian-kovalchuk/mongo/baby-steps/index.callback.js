const mongodb = require('mongodb')

const { MongoClient } = mongodb

const client = new MongoClient('mongodb://localhost:27017')

client.connect((error, connection) => {
    if (error) return console.error('ERROR', error)

    const db = connection.db('postits')

    const users = db.collection('users')

    users.deleteMany({}, (error, result) => {
        try {
            if (error) return console.error('ERROR', error)

            console.log('delete many', result)

            //throw new Error('wtf')

            users.insertOne({
                name: 'James Hook 2',
                email: 'james@hook.com',
                password: '123123123'
            }, (error, result) => {
                try {
                    if (error) return console.error('ERROR', error)

                    console.log('insert one', result)

                    //throw new Error('wtf')

                    connection.close(error => {
                        if (error) return console.error('ERROR', error)

                        console.log('disconnected')
                    })
                } catch (error) {
                    console.error('ERROR', error)
                }
            })
        } catch (error) {
            console.error('ERROR', error)
        }
    })
})
