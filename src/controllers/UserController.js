const UserModel = require('../models/UserModel')

class UserController{

    async create(req,res){
        const name = req.body.name;
        const age = req.body.age;
        const gender = req.body.gender;
        const dob = req.body.dob;

        await UserModel.create({ name, age, gender, dob });
        console.log(res.json(UserModel));
        return res.json(UserModel);
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