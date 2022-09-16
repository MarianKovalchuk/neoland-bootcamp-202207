require('dotenv').config()

const { connect, disconnect, Types: { ObjectId } } = require('mongoose')
const { User, Task } = require('../../../models')
const { NotFoundError } = require('errors')
const retrieveTasks = require('.')

const { MONGO_URL } = process.env

describe('retrieveTasks', () => {
    beforeAll(() => connect(MONGO_URL))
   

    beforeEach(() => Promise.all([User.deleteMany(), Task.deleteMany()]))

    it('succeeds on existing user and tasks', () => {  // happy path
        const name = 'Pepito Grillo'
        const email = 'pepito@grillo.com'
        const password = '123123123'

        const text1 = 'hola mundo'
        const text2 = 'hello world'
        const text3 = 'pryvit svit'

        const user = new User({ name, email, password })

        return Promise.all([
            user.save(),
            Task.create({ user: user.id, text: text1 }), // create() -> new, save()
            Task.create({ user: user.id, text: text2 }),
            Task.create({ user: user.id, text: text3 })
        ])
            .then(([user, task1, task2, task3]) =>
                retrieveTasks(user.id)
                    .then(tasks => {
                        expect(tasks).toHaveLength(3)

                        const _task1 = tasks.find(task => task.id === task1.id)
                        expect(_task1).toBeDefined()
                        expect(_task1.user).toBeUndefined()
                        expect(_task1.text).toEqual(task1.text)
                        expect(_task1.visibility).toEqual(task1.visibility)
                        expect(_task1.createdAt).toEqual(task1.createdAt)
                        expect(_task1.modifiedAt).toBeUndefined()

                        const _task2 = tasks.find(task => task.id === task2.id)
                        expect(_task2).toBeDefined()
                        expect(_task2.user).toBeUndefined()
                        expect(_task2.text).toEqual(task2.text)
                        expect(_task2.visibility).toEqual(task2.visibility)
                        expect(_task2.createdAt).toEqual(task2.createdAt)
                        expect(_task2.modifiedAt).toBeUndefined()

                        const _task3 = tasks.find(task => task.id === task3.id)
                        expect(_task3).toBeDefined()
                        expect(_task3.user).toBeUndefined()
                        expect(_task3.text).toEqual(task3.text)
                        expect(_task3.visibility).toEqual(task3.visibility)
                        expect(_task3.createdAt).toEqual(task3.createdAt)
                        expect(_task3.modifiedAt).toBeUndefined()
                    })
            )
    })

    it('fails on non-existing user', () => {  // unhappy path
        const userId = new ObjectId().toString()

        return retrieveTasks(userId)
            .catch(error => {
                expect(error).toBeInstanceOf(NotFoundError)
                expect(error.message).toEqual(`user with id ${userId} not found`)
            })
    })

    afterAll(() => disconnect())
})