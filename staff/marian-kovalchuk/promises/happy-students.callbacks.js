var fine = true

function areStudentsFine(callback) {
    setTimeout(() => {
        if (!fine) return callback(new Error('not fine :('))

        callback(null, 'they are happy! :)')
    }, 4000)
}


areStudentsFine((error, result) => {
    if (error) return console.error(error)

    console.log(result)
})


// undefined
// VM1599:15 they are happy! :)
fine = false
// false
areStudentsFine((error, result) => {
    if (error) return console.error(error)

    console.log(result)
})
// undefined
// VM1640:2 Error: not fine :(
//     at <anonymous>:5:36