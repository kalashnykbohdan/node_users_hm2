const express = require("express");
const cors = require('cors');
const userRouter = require('./users/user.router');
require("dotenv").config();

module.exports = class UsersServer {
    constructor(){
        this.server = null;
    }
    start(){
        this.initServer();
        this.initMiddelwares();
        this.initRoutes();
        this.startListening();
    }

    initServer(){
        this.server = express();
    }

    initMiddelwares(){
        this.server.use(express.json());
        this.server.use(cors({ origin: "http://localhost:3000 "}))
    }

    initRoutes(){
        this.server.use('/users', userRouter);
    }

    startListening(){
        this.server.listen(process.env.PORT, () => {
            console.log("Started listening on port", process.env.PORT);
        });
    }
}
