const UserModel = require('../models/UserModel')

class UserController{

    async create(req,res){
        const name = req.body.name;
        const age = req.body.age;
        const gender = req.body.gender;
        const dob = req.body.dob;
        try {
            const user = await UserModel.create({ name, age, gender, dob });
            return res.status(200).json(user);
        } catch (error) {
            res.status(400).json('error')
        }
        
    }

    async list(req,res){
        const all = await UserModel.find();
        
        return res.json(all);
    }

    async detail(req, res){
        const id = req.body.person_Id;
        await UserModel.findById(id).exec(function (err, user) {
            res.json(user);
        })
    }


}

module.exports = UserController;