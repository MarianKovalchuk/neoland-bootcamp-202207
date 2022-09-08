const { connect, disconnect, Types: { ObjectId } } = require('mongoose')
const { User, Task } = require('../../../models')
const { NotFoundError } = require('../../../errors')
const createTask = require('.')

describe('createTask', () => {
    beforeAll(() => connect('mongodb+srv://marian:5d32a811@cluster0.pjhliet.mongodb.net/test2'))

    beforeEach(() => Promise.all([User.deleteMany(), Task.deleteMany()]))

    it('succeeds on correct data', () => {  // happy path
        const name = 'Pepito Grillo'
        const email = 'pepito@grillo.com'
        const password = '123123123'

        const text = 'hola mundo'

        return User.create({ name, email, password })
            .then(user =>
                createTask(user.id, text)
                    .then(res => {
                        expect(res).toBeUndefined()

                        return Task.find()
                    })
                    .then(tasks => {
                        expect(tasks).toHaveLength(1)

                        const [task] = tasks

                        expect(task.user.toString()).toEqual(user.id)
                        expect(task.text).toEqual(text)
                        expect(task.visibility).toEqual('private')
                        expect(task.createAt).toBeInstanceOf(Date)
                        expect(task.modifiedAt).toBeUndefined()
                    })
            )

    })

    it('fails on non-existing user', () => {  // unhappy path
        const userId = new ObjectId().toString()

        // return createTask(userId)
        //     .then(() => { throw new Error('should not reach this point') })
        //     .catch(error => {
        //         expect(error).toBeInstanceOf(NotFoundError)
        //         expect(error.message).toEqual(`user with id ${userId} not found`)
        //     })
        
        return expect(createTask(userId)).rejects.toThrowError(NotFoundError, `user with id ${userId} not found`)
    })

    afterAll(() => disconnect())
})