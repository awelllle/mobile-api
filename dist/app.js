"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = require("dotenv");
(0, dotenv_1.config)();
const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const cors = require("cors");
const index_1 = require("./routes/index");
class App {
    constructor() {
        this.route = new index_1.Routes();
        this.mongoUrl = process.env.MONGO_URL;
        this.app = express();
        this.config();
        this.route.routes(this.app);
        this.app.set('trust proxy', 1);
        this.mongoSetup();
    }
    config() {
        this.app.use(bodyParser.json());
        this.app.use(bodyParser.urlencoded({ limit: '50mb', extended: false }));
        this.app.use(cors());
    }
    mongoSetup() {
        // mongoose.Promise = global.Promise;
        // mongoose.connect(this.mongoUrl, { useNewUrlParser: true });
        mongoose.connect(this.mongoUrl)
            .then(res => { console.log(`${this.mongoUrl}`); })
            .catch(err => { console.log('mongo error in connection:', err); });
    }
}
exports.default = new App().app;
//# sourceMappingURL=app.js.map