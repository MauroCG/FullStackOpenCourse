const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')

const api = supertest(app)


test('notes are returned as json', async () => {
  const response = await api.get('/api/notes')
  //console.log(response)
  expect(response.statusCode).toBe(200)
  expect(response.type).toBe('application/json')
}, 100000)

/*
test('there are six notes', async () => {
  const response = await api.get('/api/notes')
  //console.log(typeof response, '--------------------------------------------', response)
  expect(response.body).toHaveLength(6)
})

test('the first note is about HTTP methods', async () => {
  const response = await api.get('/api/notes')

  expect(response.body[0].content).toBe('HTML is Easy')
})
*/

beforeAll(done => {
  done()
})

afterAll(async done => {
  mongoose.connection.close()
  //console.log('connection closed')
  done()
})