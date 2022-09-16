const express = require('express')
const { Router, json } = express
const jsonBodyParser = json()
const { registerUserHandler, authenticateUserHandler, retrieveUserHandler } = require('./users')
const { createTaskHandler, retrieveTaskHandler, updateTaskTextHandler, searchTaskHandler, deleteTaskHandler } = require('./tasks')

const usersRouter = Router()

usersRouter.post('/users', jsonBodyParser, registerUserHandler)
usersRouter.post('/users/auth', jsonBodyParser, authenticateUserHandler)
usersRouter.get('/users', retrieveUserHandler)
// TODO usersRouter.patch('/users/email', jsonBodyParser, updateUserEmailHandler)
// TODO usersRouter.patch('/users/password', jsonBodyParser, updateUserPasswordHandler)
// TODO usersRouter.patch('/users/info', jsonBodyParser, updateUserInfoHandler)

const tasksRouter = Router()

tasksRouter.post('/tasks', jsonBodyParser, createTaskHandler)
tasksRouter.get('/tasks', retrieveTaskHandler)
tasksRouter.patch('/tasks/:taskId', jsonBodyParser, updateTaskTextHandler)
tasksRouter.get('/tasks/search', searchTaskHandler)
tasksRouter.delete('/tasks/:taskId', deleteTaskHandler)

module.exports = {
    usersRouter,
    tasksRouter
}