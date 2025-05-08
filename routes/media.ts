import { MediaController } from '../controllers/media';
import {authenticate} from '../utils/middleware/authenticate';

export class MediaRoutes {
    public mediaController: MediaController = new MediaController();

    public routes(app): void {
        app.route('/media/upload').post([authenticate], this.mediaController.upload)
       // app.route('/media/uploadCsv').post([authenticate], this.mediaController.uploadCsv)
    }
}