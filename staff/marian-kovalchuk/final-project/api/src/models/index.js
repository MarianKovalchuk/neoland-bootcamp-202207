const { model } = require('mongoose')
const { user, task, priority } = require('./schemas')

module.exports = {
    User: model('User', user),
    Task: model('Task', task)
}