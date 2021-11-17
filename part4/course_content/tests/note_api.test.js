const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')

const api = supertest(app)


describe('INTEGRATION TEST OF THE API', () => {
  test('notes are returned as json', async () => {
    const response = await api.get('/api/notes')
    //console.log(response)
    expect(response.statusCode).toBe(200)
    expect(response.type).toBe('application/json')
  }, 100000)

  test('there are six notes', async () => {
    const response = await api.get('/api/notes')
    //console.log(typeof response, '--------------------------------------------', response)
    expect(response.body).toHaveLength(6)
  })

  test('the first note is about HTTP methods', async () => {
    const response = await api.get('/api/notes')

    expect(response.body[0].content).toBe('HTML is Easy')
  })


  afterAll(async (done) => {
    await mongoose.connection.close()
    //console.log('connection closed')
    done()
  })
})