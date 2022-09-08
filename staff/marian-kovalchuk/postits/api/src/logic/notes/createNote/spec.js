const { connect, disconnect, Types: { ObjectId } } = require('mongoose')
const { User, Note } = require('../../../models')
const { NotFoundError } = require('../../../errors')
const createNote = require('.')

describe('createNote', () => {
    beforeAll(() => connect('mongodb+srv://marian:5d32a811@cluster0.pjhliet.mongodb.net/test'))

    beforeEach(() => Promise.all([User.deleteMany(), Note.deleteMany()]))

    it('succeeds on correct data', () => {  // happy path
        const name = 'Pepito Grillo'
        const email = 'pepito@grillo.com'
        const password = '123123123'

        const text = 'hola mundo'

        return User.create({ name, email, password })
            .then(user =>
                createNote(user.id, text)
                    .then(res => {
                        expect(res).toBeUndefined()

                        return Note.find()
                    })
                    .then(notes => {
                        expect(notes).toHaveLength(1)

                        const [note] = notes

                        expect(note.user.toString()).toEqual(user.id)
                        expect(note.text).toEqual(text)
                        expect(note.visibility).toEqual('private')
                        expect(note.createAt).toBeInstanceOf(Date)
                        expect(note.modifiedAt).toBeUndefined()
                    })
            )

    })

    it('fails on non-existing user', () => {  // unhappy path
        const userId = new ObjectId().toString()

        // return createNote(userId)
        //     .then(() => { throw new Error('should not reach this point') })
        //     .catch(error => {
        //         expect(error).toBeInstanceOf(NotFoundError)
        //         expect(error.message).toEqual(`user with id ${userId} not found`)
        //     })
        
        return expect(createNote(userId)).rejects.toThrowError(NotFoundError, `user with id ${userId} not found`)
    })

    afterAll(() => disconnect())
})