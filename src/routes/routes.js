const { response } = require('express');
const express = require('express');
const UserModel = require('../models/UserModel')
const router = express.Router()


router.get(
    '/', (req, res) => {
        res.send('Hello World');
    })

router.post(
    '/userSignup',
    async (req, res) => {
        const name = req.body.name
        const age = req.body.age
        const gender = req.body.gender
        const dob = req.body.dob
        await UserModel.create({ name, age, gender, dob });
        try {
            res.json("User created with success")
            res.json(UserModel)
        } catch (error) {
            res.json("error")
        }
    }
)

router.get(
    '/list',
    async (req, res) => {
        const all = await UserModel.find();
        try {
            res.json(all);
        } catch (error) {
            res.json(error);
        }

    }
)

router.get(
    '/detailPerson',
    async (req, res) => {
        const id = req.body.person_Id;
        await UserModel.findById(id).exec(function (err, user) {
            res.json(user);
        })
    }
)

module.exports = router;