//const AccountModel = require('../src/models/AccountModel');
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
        await db.collection('usersbaas').deleteMany({});
    });

    it('should be able to create a new user', async done=>{
        
        const res = await request.post('/userSignup').send(user);
        
        expect(res.status).toBe(200);
        expect(res.body.name).toBe(user.name);
        expect(res.body._id).toBeDefined();
        done();
    })
    it('should not be able to create a new user without a name', async done =>{
        const wrong_user = {
            age : 23,
            gender : 'male',
            dob : faker.date.past()
        }
        const res = await request.post('/userSignup').send(wrong_user);
        
        expect(res.status).toBe(400);
        done();
    })
    it('should be able to create a new account', async done =>{
        const userSignup = await request.post('/userSignup').send(user);

        const id = userSignup.body._id;

        const account ={
            email : faker.internet.email(),
            password : faker.internet.password(),
            balance : 15,
            person_id : id
        }

        const res = await request.post('/accountSignup').send(account)

        expect(res.status).toBe(200);
        expect(res.body._id).toBeDefined();
        done();
    })

});