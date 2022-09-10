require('dotenv').config()
const { NotFoundError } = require('errors')
const { User, Task } = require('../../../models')
const deleteTask = require('./deleteTask')
const { connect, disconnect, Types: { ObjectId } } = require('mongoose')
const chai = require('chai')
const chaiaspromise = require('chai-as-promised')
const expect = chai.expect
chai.use(chaiaspromise)
const { env : {MONGO_URL_TEST}} = process

describe('deleteTask', () => {

    before(() => connect(MONGO_URL_TEST))

    beforeEach(() => Promise.all([User.deleteMany(), Task.deleteMany()]))

    it('Succeeds deleting an existing user', () => {
        const name = 'Pepito Grillo'
        const email = 'pepito@grillo.com'
        const password = '123123123'
        const title = 'Pepito Grillo';

        return (async () => {
            await User.create({ name, email, password })

            const user = await User.findOne({ 'email': email })

            const task = await Task.create({ user: user.id, title })

            await deleteTask(user.id, task.id)

            const tasks = await Task.find()

            expect(tasks).to.have.lengthOf(0)

        })()
    }),

        it('Fails trying to delete with unexisting taskId but existing user with one task', () => {

            const name = 'Pepito Grillo'
            const email = 'pepito@grillo.com'
            const password = '123123123'
            const title = 'Pepito Grillo'
            const badId = new ObjectId().toString();

            return (async () => {
                await User.create({ name, email, password })

                const user = await User.findOne({ 'email': email })

                const task = await Task.create({ user: user.id, title })

                await expect(deleteTask(user.id, badId)).to.eventually.be.rejectedWith(`Task with id ${badId} not found`)
                    .and.be.an.instanceOf(NotFoundError)

                const tasks = await Task.find()

                expect(tasks).to.have.lengthOf(1)
            })()

        }),

        it('Fails trying to delete task with unexisting userId', () => {
            const name = 'Pepito Grillo'
            const email = 'pepito@grillo.com'
            const password = '123123123'

            const title = 'Pepito Grillo'
            const badId = new ObjectId().toString();

            return (async () => {
                const user = await User.create({ name, email, password })

                const task = await Task.create({ user: user.id, title })


                await expect(deleteTask(badId, task.id)).to.eventually.be.rejectedWith(`User with ID ${badId} not found`)
                    .and.be.an.instanceOf(NotFoundError)
            })()
        })

    it('Fails if taskId does not belong userId', () => {
        const name = 'Pepito Grillo'
        const email = 'pepito@grillo.com'
        const password = '123123123'

        const email2 = 'pepito2@grillo.com'
        const title = 'Pepito Grillo';

            return (async () => {
                
                const user = await User.create({ name, email, password })

                const user2 = await User.create({ name, email: email2, password })

                const task = await Task.create({ user: user.id, title })

                await expect(deleteTask(user2.id, task.id)).to.eventually.be.rejected
            })()
    })

    after(() => disconnect())
})