require('dotenv').config()
const express = require('express')
const cors = require('cors')
const morgan = require('morgan') // The morgan middleware to logging
const Person = require('./models/person') // Person model from MongoDB

const app = express()

app.use(express.json()) // Puts the content in property body of the request
app.use(cors())
//app.use(express.static('build'))

// Personalized function to use logging with morgan
morgan.token('body', function (req) { return JSON.stringify(req.body) }) // Custom token to return the body

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



app.get('/info', (request, response) => {
  const current_time = new Date()

  Person.count({})
    .then(count => {
      response.send(`
                <p>The phonebook has data of ${count} people</p>
                <p>${current_time}</p>
            `)
    })
})

app.get('/api/persons', (request, response) => { // Get all the data
  Person.find({}).then(persons => {
    response.json(persons)
  })
})

app.get('/api/persons/:id', (request, response, next) => { // Get information of a single person
  Person.findById(request.params.id).then(result => {
    if (result) {
      response.json(result)
    } else {
      response.status(404).end()
    }
  })
    .catch(error => next(error))
})

app.delete('/api/persons/:id', (request, response, next) => { // Deletes the information of a single person
  Person.findByIdAndDelete(request.params.id).then(result => {
    console.log(result)
    response.status(204).end()
  })
    .catch(error => {
      next(error)
    })
})

app.put('/api/persons/:id', (request, response, next) => { // Mdify the number of a existing person entry
  const body = request.body

  const person = {
    name: body.name,
    number: body.number,
  }

  //console.log(request.params.id, person)

  Person.findByIdAndUpdate(request.params.id, person, { new: true, runValidators: true })
    .then(updatedPerson => {
      //console.log('Person data updated')
      response.json(updatedPerson)
    })
    .catch(error => next(error))
})

app.post('/api/persons', (request, response, next) => { // Saves information of a single person to the phonebook
  const person = Person({ // Creates a new person
    name: request.body.name,
    number: request.body.number
  })

  person.save()
    .then(addedPerson => {
      response.json(addedPerson)
    })
    .catch(error => next(error))
})


const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: 'unknown endpoint' })
}

// handler of requests with unknown endpoint
app.use(unknownEndpoint)

const errorHandler = (error, request, response, next) => {
  console.log(error.name)

  if (error.name === 'CastError') {
    return response.status(400).send({ error: 'malformatted id' })
  }

  if (error.name === 'ValidationError') {
    return response.status(400).json({ error: error.message })
  }

  if (error.name === 'MongoServerError') {
    return response.status(400).json({ error: error.message })
  }

  next(error)
}

// handler of requests with result to errors
app.use(errorHandler)



const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
