const API_URL = process.env.REACT_APP_API_URL

function createTask(token, callback) {
    if (typeof token !== 'string') throw new TypeError('token is not a string')
    if (token.trim().length === 0) throw new Error('token is empty or blank')

    if (typeof callback !== 'function') throw new TypeError('callback is not a function')

    const xhr = new XMLHttpRequest

    // response

    xhr.onload = function () {
        const status = xhr.status

        if (status >= 500)
            callback(new Error(`server error (${status})`))
        else if (status >= 400)
            callback(new Error(`client error (${status})`))
        else if (status === 201)
            callback(null)
    }

    // request

    xhr.open('POST', `${API_URL}/tasks`)

    xhr.setRequestHeader('Authorization', `Bearer ${token}`)
    xhr.setRequestHeader('Content-type', 'application/json')

    const json = JSON.stringify({ text: '' })

    xhr.send(json)
}


export default createTask
