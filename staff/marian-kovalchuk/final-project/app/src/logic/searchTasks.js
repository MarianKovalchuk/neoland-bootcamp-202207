import { validateText, validateString, validateCallback } from 'validators'
import { AuthError, ClientError, ServerError, UnknownError } from 'errors'

const API_URL = process.env.REACT_APP_API_URL

function searchTasks(token, query, callback) {
    validateText(token, 'token')
    validateString(query, 'query')
    validateCallback(callback)

    const xhr = new XMLHttpRequest

    // response

    xhr.onload = function () {
        const status = xhr.status

        const json = xhr.responseText

        const tasks = JSON.parse(json)
        const { error } = tasks

        switch (true) {
            case (status >= 500):
                callback(new ServerError(error))
                break
            case (status === 401):
                callback(new AuthError(error))
                break
            case (status >= 400):
                callback(new ClientError(error))
                break
            case (status === 200):
                callback(null, tasks.reverse())
                break
            default:
                callback(new UnknownError(`unexpected status ${status}`))
        }
    }

    // request

    xhr.open('GET', `${API_URL}/tasks/search?q=${query}`)

    xhr.setRequestHeader('Authorization', `Bearer ${token}`)

    xhr.send()
}

export default searchTasks