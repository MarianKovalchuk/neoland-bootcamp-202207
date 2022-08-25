import { EMAIL_REGEX } from './constants'

function registerUser(name, nickname, email, password, callback) {
    if (typeof name !== 'string') throw new TypeError('name is not a string')
    if (name.trim().length === 0) throw new Error('name is empty or blank')

    if (typeof nickname !== 'string') throw new TypeError('nickname is not a string')
    if (nickname.trim().length === 0) throw new Error('nickname is empty or blank')

    if (typeof email !== 'string') throw new TypeError('email is not a string')
    if (email.trim().length === 0) throw new Error('email is empty or blank')
    if (email.length < 6) throw new Error('email length is not valid')
    if (!EMAIL_REGEX.test(email)) throw new Error('email is not valid')

    if (typeof password !== 'string') throw new TypeError('password is not a string')
    if (password.trim().length === 0) throw new Error('password is empty or blank')
    if (password.length < 8) throw new Error('password length is less than 8 characters')

    if (typeof callback !== 'function') throw new TypeError('callback is not a function')

    const xhr = new XMLHttpRequest

    // response

    xhr.onload = function() {
        const status = xhr.status

        if (status >= 500)
            callback(new Error(`server error (${status})`))
        else if (status >= 400)
            callback(new Error(`client error (${status})`))
        else if (status === 201) 
            callback(null)            
    }

    // request
    
    xhr.open('POST', 'https://b00tc4mp.herokuapp.com/api/v2/users')

    xhr.setRequestHeader('Content-type', 'application/json')

    xhr.send(`{"name": "${name}", "username": "${email}", "password": "${password}" }`)
}

export default registerUser