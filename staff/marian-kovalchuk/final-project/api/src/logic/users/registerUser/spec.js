const { connect, disconnect } = require('mongoose')
const { User } = require('../../../models')
const { DuplicityError } = require('errors')
const registerUser = require('.')

describe('registerUser', () => {
    beforeAll(() => connect('mongodb+srv://marian:5d32a811@cluster0.pjhliet.mongodb.net/test2'))

    beforeEach(() => User.deleteMany())

    it('succeeds on new user', async () => {  // happy path
        const name = 'Pepito Grillo'
        const email = 'pepito@grillo.com'
        const password = '123123123'

        const res = await registerUser(name, email, password)

        expect(res).toBeUndefined()

        const users = await User.find({ email })

        expect(users).toHaveLength(1)

        const [user] = users

        expect(user.name).toEqual(name)
        expect(user.email).toEqual(email)
        expect(user.password).toEqual(password)
    })

    it('fails on existing user', async () => {  // unhappy path
        const name = 'Pepito Grillo'
        const email = 'pepito@grillo.com'
        const password = '123123123'

        try {
            await User.create({ name, email, password })
            
            await registerUser(name, email, password)
        } catch (error) {
            expect(error).toBeInstanceOf(DuplicityError)
            expect(error.message).toEqual('user already exists')
        }
    })

    afterAll(() => disconnect())
})