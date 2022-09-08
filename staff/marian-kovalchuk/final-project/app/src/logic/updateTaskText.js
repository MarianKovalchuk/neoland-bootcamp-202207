const API_URL = process.env.REACT_APP_API_URL

function updateTaskText(token, taskId, text, callback) {
    if (typeof token !== 'string') throw new TypeError('token is not a string')
    if (token.trim().length === 0) throw new Error('token is empty or blank')

    if (typeof taskId !== 'string') throw new TypeError('task id is not a string')
    if (taskId.trim().length === 0) throw new Error('task id is empty or blank')

    if (typeof text !== 'string') throw new TypeError('text is not a string')

    if (typeof callback !== 'function') throw new TypeError('callback is not a function')

    const xhr = new XMLHttpRequest

    // response

    xhr.onload = function () {
        const status = xhr.status

        if (status >= 500)
            callback(new Error(`server error (${status})`))
        else if (status >= 400)
            callback(new Error(`client error (${status})`))
        else if (status === 204)
            callback(null)
    }

    // request

    xhr.open('PATCH', `${API_URL}/tasks/${taskId}`)

    xhr.setRequestHeader('Authorization', `Bearer ${token}`)
    xhr.setRequestHeader('Content-type', 'application/json')

    const json = JSON.stringify({ text })

    xhr.send(json)
}

export default updateTaskText