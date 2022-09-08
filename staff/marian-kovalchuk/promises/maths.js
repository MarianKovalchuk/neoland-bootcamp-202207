function random() {
    return Math.round(Math.random() * 10)
}

new Promise((resolve, reject) => {
    console.log('maths')
    
    resolve(random())
})
    .then(res => {
        console.log(res)

        if (res >= 5)
            return ':)'
        else
            throw ':('
            
    })
    .then(success => console.log(success, 'congratulations!'))
    .catch(err => console.error(err, 'fatal, study more...'))