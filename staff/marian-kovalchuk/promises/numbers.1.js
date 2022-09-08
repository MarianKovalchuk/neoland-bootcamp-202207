new Promise((resolve, reject) => {
    resolve(10)
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
// VM467:5 10
// VM467:10 20
// VM467:20 30
// VM467:25 40
// VM467:35 50
// Promise {<fulfilled>: 60}