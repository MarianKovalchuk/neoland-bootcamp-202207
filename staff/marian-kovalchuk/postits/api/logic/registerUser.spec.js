const { readdir, readFile, writeFile } = require('fs')
const registerUser = require('./registerUser')
const { DuplicityError } = require('../errors')
const { deleteFiles } = require('../utils')

describe('registerUser', () => {
    const folder = './data/users'

    beforeEach(done => deleteFiles(folder, done))

    it('succeds registering a new user', done => { // happy path
        const name = 'Marian1'
        const email = 'marian1@ko.com'
        const password = '123123123'

        debugger

        registerUser(name, email, password, error => {
            expect(error).toBeNull()

            readdir(folder, (error, files) => {
                if (error) return done(error)

                files = files.filter(file => !file.startsWith('.'))

                expect(files).toHaveLength(1)

                const file = files[0]

                readFile(`${folder}/${file}`, 'utf8', (error, json) => {
                    if (error) return done(error)

                    const user = JSON.parse(json)

                    expect(typeof user.id).toBe('string')
                    expect(user.name).toEqual(name)
                    expect(user.email).toEqual(email)
                    expect(user.password).toEqual(password)

                    done()
                })
            })
        })
    })

    it('should fail when user already exists', done => { // unhappy path
        const name = 'Marian1'
        const email = 'marian1@ko.com'
        const password = '123123123'

        const user = { id: `user-${Math.round(Math.random() * Date.now())}`, name, email, password }

        const json = JSON.stringify(user)

        writeFile(`${folder}/${user.id}.json`, json, 'utf8', error => {
            if (error) return done(error)

            registerUser(name, email, password, error => {
                expect(error).toBeInstanceOf(DuplicityError)
                expect(error.message).toEqual(`user with email ${email} already exists`)

                readdir(folder, (error, files) => {
                    if (error) return done(error)

                    files = files.filter(file => !file.startsWith('.'))

                    expect(files).toHaveLength(1)

                    readFile(`${folder}/${user.id}.json`, 'utf8', (error, json) => {
                        if (error) return done(error)

                        const _user = JSON.parse(json)

                        expect(_user.id).toEqual(user.id)
                        expect(_user.name).toEqual(user.name)
                        expect(_user.email).toEqual(user.email)
                        expect(_user.password).toEqual(user.password)

                        done()
                    })
                })
            })
        })
    })

    afterAll(done => deleteFiles(folder, done))
})