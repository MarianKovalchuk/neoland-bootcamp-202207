const express = require('express')
const { readdir, readFile } = require('fs')

const api = express()

const jsonBodyParser = express.json() // ... const body = JSON.parse(json) -> req.body = body

api.post('/api/users/auth', jsonBodyParser, (req, res) => {

    const { body: { email, password } } = req

    // TODO check if user (email) already exists!

    readdir('./data/users', (error, files) => {
        if (error) {
            res.status(500).json({ error: error.message })

            return
        }
        if (files.length) {
            let index = 0
            let file = files[index];

            (function iterate() {
                readFile(`./data/users/${file}`, 'utf8', (error, json) => {
                    if (error) {
                        res.status(500).json({ error: error.message })

                        return
                    }

                    const user = JSON.parse(json)

                    if (user.email === email)
                        if (user.password === password) {
                            res.status(200).json({ userId: user.id })

                            return
                        } else {

                            res.status(401).json({ error: 'wrong credentials' })

                            return
                        }

                    index++

                    if (index < files.length) {
                        file = files[index]

                        iterate()

                        return
                    }
                    res.status(401).json({ error: 'wrong credentials' })
                })
            })() //iife
            return

        }
        res.status(401).json({ error: 'wrongs credentials' })
    })
})


//// api.post('/api/users/auth', jsonBodyParser, (req, res) => {})

api.listen(8080, () => console.log("api started"))