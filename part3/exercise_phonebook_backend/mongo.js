const mongoose = require('mongoose')

if (process.argv.length < 3) {
  console.log('Please provide the password as an argument: node mongo.js <password>')
  process.exit(1)
}

const password = process.argv[2]

const url =
  `mongodb+srv://fso_mongo:${password}@cluster0.mspzx.mongodb.net/phonebook-app?retryWrites=true&w=majority`

mongoose.connect(url)

const personSchema = new mongoose.Schema({
  name: String,
  number: String,
})

const Person = mongoose.model('Person', personSchema)


// Function to add a new person to the phonebook
const addPerson = () => {
    const person = new Person({
        name: process.argv[3],
        number: process.argv[4],
    })

    person.save().then(result => {
        console.log(`added ${result.name} number ${result.number}`)
        mongoose.connection.close()
    })
}

if (process.argv.length == 5) { // Add a new person
    addPerson()
} else if (process.argv.length == 3) { // Fetches the entire phonebook data
    Person.find({}).then(result => {
        console.log('phonebook:')
        result.forEach(person => {
            console.log(`${person.name} ${person.number}`)
        })
        mongoose.connection.close()
    })
} else {
    console.log('Please provide the correct amount of parameters node mongo.js "name" "number"')
    mongoose.connection.close()
}