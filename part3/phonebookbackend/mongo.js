const mongoose = require('mongoose')

if (process.argv.length < 3) {
    console.log('give password as argument')
    process.exit(1)
}

const password = process.argv[2]

const url = `mongodb+srv://thezmmm:${password}@cluster0.xvthtxy.mongodb.net/phonebook?retryWrites=true&w=majority&appName=Cluster0`

mongoose.set('strictQuery',false)

mongoose.connect(url)

const personSchema = new mongoose.Schema({
    name: String,
    number: String,
})

const Person = mongoose.model('Person', personSchema)

async function addPerson(name,number){

    const person = new Person({
        name: name,
        number: number,
    })
    await person.save()
    console.log(`added ${name} number ${number} to phonebook`)
}

async function listPersons(){
    const result = await Person.find({})
    result.forEach( person => {
        console.log(person.name, person.number)
    })
    return result
}

async function main() {
    if (process.argv.length === 5) {
        const name = process.argv[3]
        const number = process.argv[4]
        await addPerson(name, number)
    } else if (process.argv.length === 3) {
        await listPersons()
    }
    mongoose.connection.close()
}

main()