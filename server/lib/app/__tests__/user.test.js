
process.env.NODE_ENV = "test";

import app from '../../server'
import models from '../../models'
import request from 'supertest'
import constants from '../controller/constants'

const testUser = {
  firstname: "abc",
  lastname : "adsflkjadsf",
  email    : "ahmad@gmail.com",
  password : "ahmed",
  roleId   : 1
}
let token;
describe('Test the root path', () => {
  jest.setTimeout(1000)
  test('It should response the POST method signup', async (done) => {
    const response = await request(app).post('/signUp').send(testUser);
    
    expect(response.status).toBe(201);
    expect(response.body.message).toEqual(constants.USER_CREATED)
    expect(response.body.user.email).toEqual(testUser.email)
    done()
  });
  // test('It should response email already exist', async (done) => {
  //   const response = await request(app).post('/signUp').send(testUser);
  //   expect(response.status).toBe(400);
  //   expect(response.body).toEqual(constants.ERROR_EMAIL_EXIST)
  //   done()
  // });
  // test('It should response the POST method login', async (done) => {
  //   const response = await request(app).post('/login').send({
  //     email   : "ahmad@gmail.com",
  //     password: "ahmad"
  //   })   
  //   token = response.body.data.token;   
  //   expect(response.status).toBe(201);
  //   expect(response.body.message).toEqual(constants.SUCCESS_EMAIL_VERIFIED)
  //   expect(token).toBeDefined()
  //   done()
  // });
  // test('it should response for invalid password', async (done) => {
  //   const response = await request(app).post('/login').send({
  //     email   : "ahmad@gmail.com",
  //     password: "ahmad123"
  //   })
  //   expect(response.status).toBe(400);
  //   done()
  // })
  // test('it should response for user existance', async (done) => {
  //   const response = await request(app).post('/login').send({
  //     email   : "ahmad123@gmail.com",
  //     password: "ahmad"
  //   })
  //   expect(response.status).toBe(400);
  //   done()
  // })
  afterAll((done) => {
    models.User.destroy({ where: {
      email: 'ahmad@gmail.com'
    } }).then(() => done())
          
  })
})


