const { request } = require("express");
const express = require("express");

const app = express();

app.use(express.json()); // Puts the content in property body of the request

const persons = [ // Hardcoded data
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


app.get('/api/persons', (request, response) => { // GET all the data
    response.json(persons)
});

app.get('/info', (request, response) => {
    const current_time = new Date()
    response.send(`
        Phonebook has infor for ${persons.length} people
        <br></br>
        ${current_time}
    `)
})


const PORT = 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
