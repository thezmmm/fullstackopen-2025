const mongoose = require("mongoose")

const numberValidator = function(v) {
    if (!v) return false

    const regex = /^\d{2,3}-\d{5,}$/
    return regex.test(v)
}

const personSchema = new mongoose.Schema({
    name: {
        type: String,
        minlength: 3,
        required: true,
    },
    number: {
        type: String,
        minlength: 8,
        required: true,
        validate: {
            validator: numberValidator,
            message: props => `${props.value} is not a valid phone number! Format must be XX-XXXXXXX or XXX-XXXXXXXX`
        }
    },
})

personSchema.set('toJSON', {
    transform: (document, returnedObject) => {
        returnedObject.id = returnedObject._id.toString()
        delete returnedObject._id
        delete returnedObject.__v
    }
})

module.exports = mongoose.model("Person", personSchema)