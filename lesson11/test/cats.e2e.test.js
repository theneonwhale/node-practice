const request = require('supertest')
const jwt = require('jsonwebtoken')
require('dotenv').config()
const { User, cats, newCat } = require('../model/__mocks__/data')
const app = require('../app')

const SECRET_KEY = process.env.JWT_SECRET
const issueToken = (payload, secret) => jwt.sign(payload, secret)
const token = issueToken({ id: User._id }, SECRET_KEY)
User.token = token

jest.mock('../model/cats.js')
jest.mock('../model/users.js')

describe('Testing the route api/cats', () => {
  let idNewCat
  describe('should handle get request', () => {
    it('should return 200 status for get all cats', async (done) => {
      const res = await request(app)
        .get('/api/cats')
        .set('Authorization', `Bearer ${token}`)

      expect(res.status).toEqual(200)
      expect(res.body).toBeDefined()
      expect(res.body.data.cats).toBeInstanceOf(Array)
      done()
    })
    it('should return 200 status by id', async (done) => {
      const cat = cats[0]
      const res = await request(app)
        .get(`/api/cats/${cat._id}`)
        .set('Authorization', `Bearer ${token}`)
      expect(res.status).toEqual(200)
      expect(res.body).toBeDefined()
      expect(res.body.data.cat).toHaveProperty('_id')
      expect(res.body.data.cat._id).toBe(cat._id)
      done()
    })
    it('should return 404 status by wrong id', async (done) => {
      const wrongId = 12345
      const res = await request(app)
        .get(`/api/cats/${wrongId}`)
        .set('Authorization', `Bearer ${token}`)
      expect(res.status).toEqual(404)
      expect(res.body).toBeDefined()
      done()
    })
  })
  describe('should handle post request', () => {
    it('should return 201 status create cat', async (done) => {
      const res = await request(app)
        .post(`/api/cats`)
        .set('Authorization', `Bearer ${token}`)
        .send(newCat)
        .set('Accept', 'application/json')

      expect(res.status).toEqual(201)
      expect(res.body).toBeDefined()
      idNewCat = res.body.data.cat._id
      done()
    })
    it('should return 400 status for wrong field', async (done) => {
      const res = await request(app)
        .post(`/api/cats`)
        .set('Authorization', `Bearer ${token}`)
        .send({ ...newCat, test: 1 })
        .set('Accept', 'application/json')

      expect(res.status).toEqual(400)
      expect(res.body).toBeDefined()
      done()
    })
    it('should return 400 status without required field name', async (done) => {
      const res = await request(app)
        .post(`/api/cats`)
        .set('Authorization', `Bearer ${token}`)
        .send({ name: 'Simon' })
        .set('Accept', 'application/json')

      expect(res.status).toEqual(400)
      expect(res.body).toBeDefined()
      done()
    })
    it('should return 400 status without required field age', async (done) => {
      const res = await request(app)
        .post(`/api/cats`)
        .set('Authorization', `Bearer ${token}`)
        .send({ age: 3 })
        .set('Accept', 'application/json')

      expect(res.status).toEqual(400)
      expect(res.body).toBeDefined()
      done()
    })
  })
  describe('should handle put request', () => {
    it('should return 200 status update cat', async (done) => {
      const res = await request(app)
        .put(`/api/cats/${idNewCat}`)
        .set('Authorization', `Bearer ${token}`)
        .send({ name: 'Boris' })
        .set('Accept', 'application/json')

      expect(res.status).toEqual(200)
      expect(res.body).toBeDefined()
      expect(res.body.data.cat.name).toBe('Boris')
      done()
    })
    it('should return 400 status for wrong field', async (done) => {
      const res = await request(app)
        .put(`/api/cats/${idNewCat}`)
        .set('Authorization', `Bearer ${token}`)
        .send({ test: 1 })
        .set('Accept', 'application/json')

      expect(res.status).toEqual(400)
      expect(res.body).toBeDefined()
      done()
    })
    it('should return 404 status with wrong id', async (done) => {
      const res = await request(app)
        .put(`/api/cats/1234`)
        .set('Authorization', `Bearer ${token}`)
        .send({ name: 'Simon' })
        .set('Accept', 'application/json')

      expect(res.status).toEqual(404)
      expect(res.body).toBeDefined()
      done()
    })
  })
  describe('should handle patch request', () => {})
  describe('should handle delete request', () => {})
})
