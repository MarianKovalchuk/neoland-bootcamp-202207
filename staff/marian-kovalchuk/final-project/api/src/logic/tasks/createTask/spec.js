require('dotenv').config()

const { connect, disconnect, Types: { ObjectId } } = require('mongoose')
const { User, Task } = require('../../../models')
const { NotFoundError } = require('errors')
const createTask = require('.')

const { MONGO_URL } = process.env

describe('createTask', () => {
    beforeAll(() => connect(MONGO_URL))

    beforeEach(() => Promise.all([User.deleteMany(), Task.deleteMany()]))

    it('succeeds on correct data', () => {  // happy path
        const name = 'Pepito Grillo'
        const email = 'pepito@grillo.com'
        const password = '123123123'

        const text = 'hola mundo'
        const priority = 'high'

        return User.create({ name, email, password })
            .then(user =>
                createTask(user.id, text, priority)
                    .then(res => {
                        expect(res).toBeUndefined()

                        return Task.find()
                    })
                    .then(tasks => {
                        expect(tasks).toHaveLength(1)

                        const [task] = tasks

                        expect(task.user.toString()).toEqual(user.id)
                        expect(task.text).toEqual(text)
                        expect(task.priority).toEqual(priority)
                        expect(task.createAt).toBeInstanceOf(Date)
                        expect(task.modifiedAt).toBeUndefined()
                    })
            )
    })

    it('fails on non-existing user', () => {  // unhappy path
        const userId = new ObjectId().toString()
        const text = 'hola mundo'
        const priority = 'high'
        
        return expect(createTask(userId, text, priority)).rejects.toThrowError(NotFoundError, `user with id ${userId} not found`)
    })

    afterAll(() => disconnect())
})