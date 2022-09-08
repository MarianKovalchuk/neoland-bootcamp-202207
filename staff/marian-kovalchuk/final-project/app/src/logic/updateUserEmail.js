import { EMAIL_REGEX } from './constants'

function updateUserEmail (token, newEmail, callback){
    
    if(typeof token !== 'string') throw new TypeError('token is not a string')
    if(token.trim().length===0)throw new Error('token is empty or black')

    if(typeof newEmail !== 'string') throw new TypeError('new email  is not a string')
    if(newEmail.trim().length===0)throw new Error('new email is empty or black')
    if(newEmail.length<8) throw new Error('new email length is less than 8 charcaters')
    if (!EMAIL_REGEX.test(newEmail)) throw new Error('email is not valid')

    if(typeof callback !== 'function')throw new TypeError('callback is nota a function')
    
    const xhr = new XMLHttpRequest

    xhr.onload = function(){
        const status = xhr.status
        if(status >= 500)
            callback(new Error(`Server error (${status})`))
        if(status >=400)
            callback(new Error(`Client error (${JSON.parse(xhr.response).error})`))
        if(status === 204)
            callback(null)
    }

    xhr.open('PATCH','https://b00tc4mp.herokuapp.com/api/v2/users')

    xhr.setRequestHeader('Content-type', 'application/json')
    xhr.setRequestHeader('Authorization', `Bearer ${token}`)

    const newData = {
        username: newEmail,
    }
    xhr.send(JSON.stringify(newData))
}
export default updateUserEmail
