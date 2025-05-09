"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppRoutes = void 0;
const app_1 = require("../controllers/app");
const auth_1 = require("../controllers/auth");
const authenticate_1 = require("../utils/middleware/authenticate");
class AppRoutes {
    constructor() {
        this.appController = new app_1.AppController();
        this.authController = new auth_1.AuthController();
    }
    routes(app) {
        app.route('/register').post(this.authController.registerUser);
        app.route('/login').post(this.authController.signIn);
        app.route('/loginWithGoogle').post(this.authController.loginWithGoogle);
        // app.route('/loginWithLinkedIn').post(this.authController.loginWithLinkedIn)
        app.route('/updateUser').post([authenticate_1.authenticate], this.appController.updateUser);
        app.route('/job').post([authenticate_1.authenticate], this.appController.createJob);
        app.route('/job').get([authenticate_1.authenticate], this.appController.jobs);
        //  app.route('/for/alerts/from/stripe').post(this.appController.stripe)
    }
}
exports.AppRoutes = AppRoutes;
//# sourceMappingURL=app.js.map