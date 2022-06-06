const Joi = require('joi');

const users = [
    {
        id: 1,
        name: 'Richard',
        email: 'richard@gmail.com',
        password: "qwerty"
    }
];

class UserController {

    get createUser(){
        return this._createUser.bind(this);
    }
    get updateUser(){
        return this._updateUser.bind(this);
    }
    get deleteUser(){
        return this._deleteUser.bind(this);
    }

    // ----------------------Read

    getUsers(req, res, next){
        return res.json(users);
    }

    // ---------------------Create

    _createUser(req, res, next) {

        const newUser = {
            ...req.body,
            id: users.length + 1,
        }

        users.push(newUser);

        console.log(users,'users');

        return res.send();
    }

    vcalidateCreateUser(req, res, next){
        
        const createUserRules = Joi.object({
            name: Joi.string().required(),
            email: Joi.string().required(),
            password: Joi.string().required(),
        }) 

        const result = createUserRules.validate(req.body);
        if(result.error){
            return res.status(400).send(result.error);
        }

        next();
    }

    //------------------------Update

    _updateUser(req, res, next){
            const targerUserIndex = this.findUserIndexById(res, req.params.id);
    
            users[targerUserIndex] = {
                ...users[targerUserIndex],
                ...req.body
            };
    
            console.log(users,'users');
    
            return res.status(200).send("Update completed");

    }

    validateUpdateUser(req, res, next){

        const updateUserRules = Joi.object({
            name: Joi.string(),
            email: Joi.string()
        })

        const result = updateUserRules.validate(req.body);

        if(result.error){
            console.log(result.error);
            return res.status(400).send(result.error);
        }

        next();
    }

    //------------------------Delete

    _deleteUser(req, res, next){
        const targerUserIndex = this.findUserIndexById(res, req.params.id);

        users.splice(targerUserIndex, 1);

        console.log(users,'users');

        return res.status(200).send("User deleted");
    }

    findUserIndexById(res, userId){
        const id = parseInt(userId);

        const targerUserIndex = users.findIndex(user => user.id === id);

        if(targerUserIndex === -1){
            throw new NotFoundError('User not found');
        }

        return targerUserIndex;
    }
    
}

class NotFoundError extends Error {
        constructor(message){
            super(message);

            this.status = 404;
            delete this.stack;
    }
}

module.exports = new UserController();