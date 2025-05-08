"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MediaRoutes = void 0;
const media_1 = require("../controllers/media");
const authenticate_1 = require("../utils/middleware/authenticate");
class MediaRoutes {
    constructor() {
        this.mediaController = new media_1.MediaController();
    }
    routes(app) {
        app.route('/media/upload').post([authenticate_1.authenticate], this.mediaController.upload);
        // app.route('/media/uploadCsv').post([authenticate], this.mediaController.uploadCsv)
    }
}
exports.MediaRoutes = MediaRoutes;
//# sourceMappingURL=media.js.map