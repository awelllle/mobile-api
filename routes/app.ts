import { AppController } from '../controllers/app';
import { AuthController } from '../controllers/auth';



import {authenticate} from '../utils/middleware/authenticate';

export class AppRoutes {
    public appController: AppController = new AppController();

    public authController: AuthController = new AuthController();

    public routes(app): void {
        app.route('/register').post(this.authController.registerUser)
        app.route('/login').post(this.authController.signIn)

        app.route('/loginWithGoogle').post(this.authController.loginWithGoogle)

        app.route('/updateUser').post([authenticate], this.appController.updateUser)
     

      //  app.route('/for/alerts/from/stripe').post(this.appController.stripe)
       
        
    }
}