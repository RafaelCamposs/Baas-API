//const AccountModel = require('../src/models/AccountModel');
const UserController = require('../src/controllers/UserController');
const { MongoClient } = require('mongodb');
const app = require('../src/app');
const supertest = require('supertest');
const request = supertest(app);
const faker = require('faker');

const user = {
    name : faker.name.findName(),
    age : 23,
    gender : 'male',
    dob : faker.date.past()
}

describe("User tests", () => {
    let connection;
    let db;

    beforeAll(async () => {
        connection = await MongoClient.connect(process.env.MONGO_URL, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });
        db = await connection.db();
    });

    afterAll(async () => {
        await connection.close();
    });

    beforeEach(async () => {
        await db.collection('userbaas').deleteMany({});
    });

    it('should be able to create a new user', async done=>{
        
        const res = await request.post('/userSignup').send(user);
        
        expect(res.status).toBe(200);
        done();
    })
    it('should not be able to create a new user without a name', async done =>{
        const user = {
            age : 23,
            gender : 'male',
            dob : faker.date.past()
        }
        const res = await request.post('/userSignup').send(user);
        
        expect(res.status).toBe(400);
        done();
    })

});