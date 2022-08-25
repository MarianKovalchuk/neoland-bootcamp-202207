const mongodb = require('mongodb')

const { MongoClient } = mongodb

const client = new MongoClient('mongodb+srv://marian:<password>@cluster0.pjhliet.mongodb.net/test');

(async () => {
    try {
        const connection = await client.connect()

        const db = connection.db('postits')

        const users = db.collection('users')

        let result = await users.deleteMany({})

        console.log('delete many', result)

        //throw new Error('wtf')

        result = await users.insertOne({
            name: 'James Hook 2',
            email: 'james@hook.com',
            password: '123123123'
        })

        console.log('insert one', result)

        //throw new Error('wtf')

        await connection.close()

        console.log('disconnected')
    } catch (error) {
        console.error('ERROR', error)
    }
})()