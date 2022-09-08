const { Types: { ObjectId }} = require('mongoose')

function validateObjectId(objectId, explain = 'Object Id') {
    if (!ObjectId.isValid(objectId)) throw new FormatError(`${explain} is not valid`)
}

module.exports = validateObjectId