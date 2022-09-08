console.log('%c Loggito %c v0.1', 'font-size: 16px; color: yellow; background-color: dodgerblue; display: block; border: 1px solid black;', 'font-size: 10px;') 

class Loggito {
    constructor(target) {
        this.target = target
    }

    debug(message) {
        console.log(`%cDEBUG ${new Date().toISOString()} ${this.target} ${message}`, 'color: green')
    }

    info(message) {
        console.log(`%cINFO ${new Date().toISOString()} ${this.target} ${message}`, 'color: blue')
    }

    warn(message) {
        console.log(`%cWARN ${new Date().toISOString()} ${this.target} ${message}`, 'color: orange')
    }

    error(message) {
        console.log(`%cERROR ${new Date().toISOString()} ${this.target} ${message}`, 'color: red')
    }

    fatal(message) {
        console.log(`%cFATAL ${new Date().toISOString()} ${this.target} ${message}`, 'background-color: red; color: white;')
    }
}

export default Loggito