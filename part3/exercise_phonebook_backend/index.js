require('dotenv').config()
const { request, response } = require("express");
const express = require("express");
const cors = require('cors');
const morgan = require('morgan') // The morgan middleware to logging
const Person = require('./models/person') // Person model from MongoDB

const app = express();

app.use(express.json()); // Puts the content in property body of the request
app.use(cors())
//app.use(express.static('build'))

// Personalized function to use logging with morgan
morgan.token('body', function (req, res) { return JSON.stringify(req.body) }) // Custom token to return the body

const customLogging = (tokens, req, res) => {
    return [
        tokens.method(req, res),
        tokens.url(req, res),
        tokens.status(req, res),
        tokens.res(req, res, 'content-length'), '-',
        tokens['response-time'](req, res), 'ms',
        // If method is POST
        tokens.method(req, res) === 'POST' ? tokens.body(req, res) : ''
    ].join(' ')
}
app.use(morgan(customLogging))



app.get('/api/persons', (request, response) => { // Get all the data
    Person.find({}).then(persons => {
        response.json(persons)
    })
});

app.get('/api/persons/:id', (request, response) => { // Geit information of a single person
    Person.findById({ _id: request.params.id }).then(result => {
        response.json(result)
    })
    .catch(error => {
        response.statusMessage = "Person hasn't found in the phonebook"
        response.status(404).end()
    })
})

app.delete('/api/persons/:id', (request, response) => { // Deletes the information of a single person
    Person.findByIdAndDelete({ _id: request.params.id }).then(result => {
        console.log(result)
        response.status(204).end()
    })
})

app.post('/api/persons', (request, response) => { // Saves information of a single person to the phonebook
    if (!request.body.name || !request.body.number) { // Error handling for missing information
        return response.status(400).json({
            error: "Name or number are missing, please supply required information"
        })
    }

    Person.find({ name: request.body.name }).then(result => { // Error handling for given a repeated name
        if (result.length > 0) {
            return response.status(400).json({
                error: 'The name mut be unique'
            })
        }
    })

    console.log('Creating the person')
    const person = Person({ // Creates a new person
        name: request.body.name,
        number: request.body.number
    })

    console.log('Saving the person to the DB')
    person.save().then(addedPerson => {
        response.json(addedPerson)
    })
})


const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
