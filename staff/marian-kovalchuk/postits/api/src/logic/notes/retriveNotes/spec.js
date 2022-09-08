const { connect, disconnect, Types: { ObjectId } } = require('mongoose')
const { User, Note } = require('../../../models')
const { NotFoundError } = require('../../../errors')
const retrieveNotes = require('.')

describe('retrieveNotes', () => {
    beforeAll(() => connect('mongodb+srv://marian:5d32a811@cluster0.pjhliet.mongodb.net/test'))

    beforeEach(() => Promise.all([User.deleteMany(), Note.deleteMany()]))

    it('succeeds on existing user and notes', () => {  // happy path
        const name = 'Pepito Grillo'
        const email = 'pepito@grillo.com'
        const password = '123123123'

        const text1 = 'hola mundo'
        const text2 = 'hello world'
        const text3 = 'pryvit svit'

        const user = new User({ name, email, password })

        return Promise.all([
            user.save(),
            Note.create({ user: user.id, text: text1 }), // create() -> new, save()
            Note.create({ user: user.id, text: text2 }),
            Note.create({ user: user.id, text: text3 })
        ])
            .then(([user, note1, note2, note3]) =>
                retrieveNotes(user.id)
                    .then(notes => {
                        expect(notes).toHaveLength(3)

                        const _note1 = notes.find(note => note.id === note1.id)
                        expect(_note1).toBeDefined()
                        expect(_note1.user).toBeUndefined()
                        expect(_note1.text).toEqual(note1.text)
                        expect(_note1.visibility).toEqual(note1.visibility)
                        expect(_note1.createdAt).toEqual(note1.createdAt)
                        expect(_note1.modifiedAt).toBeUndefined()

                        const _note2 = notes.find(note => note.id === note2.id)
                        expect(_note2).toBeDefined()
                        expect(_note2.user).toBeUndefined()
                        expect(_note2.text).toEqual(note2.text)
                        expect(_note2.visibility).toEqual(note2.visibility)
                        expect(_note2.createdAt).toEqual(note2.createdAt)
                        expect(_note2.modifiedAt).toBeUndefined()

                        const _note3 = notes.find(note => note.id === note3.id)
                        expect(_note3).toBeDefined()
                        expect(_note3.user).toBeUndefined()
                        expect(_note3.text).toEqual(note3.text)
                        expect(_note3.visibility).toEqual(note3.visibility)
                        expect(_note3.createdAt).toEqual(note3.createdAt)
                        expect(_note3.modifiedAt).toBeUndefined()
                    })
            )
    })

    it('fails on non-existing user', () => {  // unhappy path
        const userId = new ObjectId().toString()

        return retrieveNotes(userId)
            .catch(error => {
                expect(error).toBeInstanceOf(NotFoundError)
                expect(error.message).toEqual(`user with id ${userId} not found`)
            })
    })

    afterAll(() => disconnect())
})