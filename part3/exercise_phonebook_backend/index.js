const { request, response } = require("express");
const express = require("express");

const app = express();

app.use(express.json()); // Puts the content in property body of the request

let persons = [ // Hardcoded data
  {
    id: 1,
    name: "Arto Hellas",
    number: "040-123456",
  },
  {
    id: 2,
    name: "Ada Lovelace",
    number: "39-44-5323523",
  },
  {
    id: 3,
    name: "Dan Abramov",
    number: "12-43-234345",
  },
  {
    id: 4,
    name: "Mary Poppendieck",
    number: "39-23-6423122",
  },
];


app.get('/api/persons', (request, response) => { // Get all the data
    response.json(persons)
});

app.get('/info', (request, response) => { // Get info of the phonebook
    const current_time = new Date()
    response.send(`
        Phonebook has infor for ${persons.length} people
        <br></br>
        ${current_time}
    `)
})

app.get('/api/persons/:id', (request, response) => { // Geit information of a single person
    const id = Number(request.params.id)
    const person = persons.find(p => p.id === id)

    if (person) {
        response.json(person)
    } else {
        response.statusMessage = `The id ${id} hasn't found for any person in the phonebook`
        response.status(404).end()
    }
})

app.delete('/api/persons/:id', (request, response) => { // Deletes the information of a single person
    const id = Number(request.params.id)

    if (id in persons.map(p => p.id)) {
        persons = persons.filter(p => p.id !== id)
        response.statusMessage = `The person with id ${id} was deleted successfully`
    } else {
        response.statusMessage = `The id ${id} hasn't found for any person in the phonebook`
    }

    response.status(204).end()

})


const PORT = 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
