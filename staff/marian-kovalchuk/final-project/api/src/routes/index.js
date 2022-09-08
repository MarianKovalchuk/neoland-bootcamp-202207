const express = require('express')
const { Router, json } = express
const jsonBodyParser = json()
const { registerUserHandler, authenticateUserHandler, retrieveUserHandler } = require('./users')
const { createTaskHandler, retrieveTasksHandler, updateTaskTextHandler, searchTasksHandler } = require('./tasks')

const usersRouter = Router()

usersRouter.post('/users', jsonBodyParser, registerUserHandler)
usersRouter.post('/users/auth', jsonBodyParser, authenticateUserHandler)
usersRouter.get('/users', retrieveUserHandler)
// TODO usersRouter.patch('/users/email', jsonBodyParser, updateUserEmailHandler)
// TODO usersRouter.patch('/users/password', jsonBodyParser, updateUserPasswordHandler)
// TODO usersRouter.patch('/users/info', jsonBodyParser, updateUserInfoHandler)

const tasksRouter = Router()

tasksRouter.post('/tasks', jsonBodyParser, createTaskHandler)
tasksRouter.get('/tasks', retrieveTasksHandler)
tasksRouter.patch('/tasks/:taskId', jsonBodyParser, updateTaskTextHandler)
tasksRouter.get('/tasks/search', searchtasksHandler)

module.exports = {
    usersRouter,
    tasksRouter
}