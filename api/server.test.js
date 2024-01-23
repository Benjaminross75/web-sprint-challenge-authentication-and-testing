// Write your tests here
const User = require('./users/users-model')
const db = require('../data/dbConfig')
const request = require('supertest')
const server = require('./server')
test('sanity', () => {
  expect(true).toBe(true)
})

beforeAll(async () =>{
  await db.migrate.rollback()
  await db.migrate.latest()
})

// beforeEach(async () =>{
//   await db('users').truncate()
// })

// afterAll(async () =>{
//   await db.destroy()
// })

// describe('GET /', ()=>{
//   it('has process.env.NODE_ENV as testing', ()=>{
//     expect(process.env.NODE_ENV).toBe('testing')
//   })
// //   it('returns 200 OK', ()=>{
// //     const newUser = {username:'bryan', password: '1234'}
// //     return request(server).post('/register').send(newUser)
// //     .expect(201)
// //   })
// // })
describe('POST /register', () =>{
  it('returns 200 OK', ()=>{
        const newUser = {username:'bryan2', password: '1234'}
        return request(server).post('/api/auth/register').send(newUser)
        .expect(201)
      })

   it('content-type is json format',()=>{
    const newUser = {username: "benjamin", password: "1234"}
    return request(server).post('/api/auth/register').send(newUser)
    .expect('Content-Type', /json/)
   })
})

describe('POST /login', () =>{
  it('returns 200 OK', () =>{
    const existingUser = {username: 'bryan2', password:'1234'}
    return request(server).post('/api/auth/login').send(existingUser)
    .expect(200)
  })
  it('content-type is json format',()=>{
    const existingUser = {username: "bryan2", password: "1234"}
    return request(server).post('/api/auth/login').send(existingUser)
    .expect('Content-Type', /json/)
   })
})
