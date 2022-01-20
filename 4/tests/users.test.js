const supertest = require('supertest')
const app = require('../app')
const User = require('../models/user')
const mongoose = require('../mongo')

const api = supertest(app)
const { initialUsers, saveUser } = require('./user_helper')

beforeEach(async () => {
  await User.deleteMany({})

  for(let user of initialUsers) {
    await saveUser(user)
  }
})

describe('post method', () => {
  
  test("cannot save less than 3 character name", async () => {
    const badNameUser = { name: "Marie", user_name: "1", password: "123456" }
    await api
      .post('/api/user/')
      .send(badNameUser)
      .expect(400)
  })

  test("cannot save less than 3 character passowrd", async () => {
    const badPassword = { name: "Marie", user_name: "Marie33", password: "12" }
    await api
      .post('/api/user/')
      .send(badPassword)
      .expect(400)
  })

  test("valid user is added to db", async () => {
    const validUser = { name: "Marie", user_name: "Marie33", password: "1245" }
    await api
      .post('/api/user/')
      .send(validUser)
      .expect(201)
      .expect('Content-Type', /json/)

    const savedUsers = await User.find({})
    expect(savedUsers).toHaveLength(initialUsers.length + 1)
  })
})