var fine = true

function areStudentsFine(callback) {
    if (callback) {
        setTimeout(() => {
            if (!fine) return callback(new Error('not fine :('))
    
            callback(null, 'they are happy! :)')
        }, 4000)

        return
    }

    return new Promise((resolve, reject) => {
        setTimeout(() => {
            if (!fine) return reject(new Error('not fine :('))
    
            resolve('they are happy! :)')
        }, 4000)
    })
}

/*
areStudentsFine((error, result) => {
    if (error) return console.error(error)

    console.log(result)
})
*/

areStudentsFine()
    .then(result => console.log(result))
    .catch(error => console.error(error))
/*
Promise {<pending>}
VM82:32 they are happy! :)
*/

fine = false
//false
areStudentsFine()
    .then(result => console.log(result))
    .catch(error => console.error(error))
/*
Promise {<pending>}
react_devtools_backend.js:4026 Error: not fine :(
    at <anonymous>:16:38
overrideMethod @ react_devtools_backend.js:4026
(anonymous) @ VM102:3
Promise.catch (async)
(anonymous) @ VM102:3
*/