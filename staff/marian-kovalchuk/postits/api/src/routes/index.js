const express = require('express')
const { Router, json } = express
const jsonBodyParser = json()
const { registerUserHandler, authenticateUserHandler, retrieveUserHandler } = require('./users')
const { createNoteHandler } = require('./notes')

const usersRouter = Router()

usersRouter.post('/users', jsonBodyParser, registerUserHandler)

usersRouter.post('/users/auth', jsonBodyParser, authenticateUserHandler)

usersRouter.get('/users', retrieveUserHandler)

const notesRouter = Router()

notesRouter.post('/notes', jsonBodyParser, createNoteHandler)

module.exports = {
    usersRouter,
    notesRouter
}