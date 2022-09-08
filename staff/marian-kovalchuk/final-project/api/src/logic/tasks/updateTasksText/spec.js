const { connect, disconnect, Types: { ObjectId } } = require('mongoose')
const { User, Task } = require('../../../models')
const { NotFoundError, AuthError } = require('../../../errors')
const updateTaskText = require('.')

describe('updateTaskText', () => {
    beforeAll(() => connect('mongodb://localhost:27017/postits-test2'))

    beforeEach(() => Promise.all([User.deleteMany(), Task.deleteMany()]))

    it('succeeds on correct data', () => {  // happy path
        const name = 'Pepito Grillo'
        const email = 'pepito@grillo.com'
        const password = '123123123'

        return User.create({ name, email, password })
            .then(user => Task.create({ user: user.id })
                .then(note => {
                    return updateTaskText(user.id, task.id, 'new Text')
                        .then(res => {
                            expect(res).toBeUndefined()

                            return Task.findById(task.id)
                        })
                        .then(noteFounded => {
                            expect(taskFounded.text).toEqual('new Text')
                            expect(taskFounded.user.toString()).toEqual(user.id)
                            expect(taskFounded.visibility).toEqual('private')
                            expect(taskFounded.createAt).toBeInstanceOf(Date)
                            expect(taskFounded.modifiedAt).toBeInstanceOf(Date)
                        })

                })
            )

    })

    it('fails on note that does not belong to the user', () => {
        const name1 = 'Pepito Grillo'
        const email1 = 'pepito@grillo.com'
        const password1 = '123123123'

        const name2 = 'Wendy Bread'
        const email2 = 'wendybread@gmail.com'
        const password2 = '123123123'

        return Promise.all([
            User.create({ name: name1, email: email1, password: password1 }),
            User.create({ name: name2, email: email2, password: password2 })
        ])
            .then(users => {
                return Task.create({ user: users[0].id })
                    .then(task => {
                        return updateTaskText(users[1].id, task.id, 'new Text')
                            .then(() => { throw new Error('it should not reach this point') })
                            .catch(error => {
                                expect(error).toBeInstanceOf(AuthError)
                                expect(error.message).toEqual(`task with id ${task.id} does not belong to user with id ${users[1].id}`)
                            })
                    })
            })
    })

    it('fails on non-existing user', () => {
        const name1 = 'Pepito Grillo'
        const email1 = 'pepito@grillo.com'
        const password1 = '123123123'

        return User.create({ name: name1, email: email1, password: password1 })
            .then(user => {
                return Task.create({ user })
                    .then(task => {
                        const wrongUserId = (new ObjectId).toString()

                        return updateTaskText(wrongUserId, task.id, 'new Text')
                            .then(() => { throw new Error('it should not reach this point') })
                            .catch(error => {
                                expect(error).toBeInstanceOf(NotFoundError)
                                expect(error.message).toEqual(`user with id ${wrongUserId} not found`)
                            })
                    })
            })
    })

    it('fails on non-existing task', () => {
        const name1 = 'Pepito Grillo'
        const email1 = 'pepito@grillo.com'
        const password1 = '123123123'

        return User.create({ name: name1, email: email1, password: password1 })
            .then(user => {
                const wrongTaskId = (new ObjectId).toString()

                return updateTaskText(user.id, wrongTaskId, 'new Text')
                    .then(() => { throw new Error('it should not reach this point') })
                    .catch(error => {
                        expect(error).toBeInstanceOf(NotFoundError)
                        expect(error.message).toEqual(`note with id ${wrongTaskId} not found`)
                    })
            })
    })

    afterAll(() => disconnect())
})