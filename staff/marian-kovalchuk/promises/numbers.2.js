new Promise((resolve, reject) => {
    resolve(10)
})
    .then(res => {
        console.log(res)

        throw res - 10

        return res + 10
    })
    .then(res => {
        console.log(res)

        return res + 10
    })
    .catch(err => {
        console.error(err)

        return err + 10
    })
    .then(res => {
        console.log(res)

        return res + 10
    })
    .then(res => {
        console.log(res)

        return res + 10
    })
    .catch(err => {
        console.error(err)

        return err + 10
    })
    .then(res => {
        console.log(res)

        return res + 10
    })
// VM583:5 10
// react_devtools_backend.js:4026 0
// overrideMethod @ react_devtools_backend.js:4026
// (anonymous) @ VM583:17
// Promise.catch (async)
// (anonymous) @ VM583:16
// VM583:22 10
// VM583:27 20
// VM583:37 30
// Promise {<fulfilled>: 40}