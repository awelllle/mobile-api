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

       // app.route('/loginWithLinkedIn').post(this.authController.loginWithLinkedIn)

        app.route('/updateUser').post([authenticate], this.appController.updateUser)

        app.route('/profile').get([authenticate], this.appController.profile)

        app.route('/job').post([authenticate], this.appController.createJob)

        app.route('/job').get([authenticate], this.appController.jobs)

        app.route('/job/:id').get([authenticate], this.appController.getJob)

        app.route('/sendMessage').post([authenticate], this.appController.sendMessage)
     

      //  app.route('/for/alerts/from/stripe').post(this.appController.stripe)
       
        
    }
}