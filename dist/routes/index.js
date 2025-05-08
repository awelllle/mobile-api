"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Routes = void 0;
const app_1 = require("./app");
const media_1 = require("./media");
class Routes {
    constructor() {
        this.appRoutes = new app_1.AppRoutes();
        this.mediaRoutes = new media_1.MediaRoutes();
    }
    routes(app) {
        app.route("/").get((req, res) => {
            res.status(200).send({
                message: "APIs are up and running!",
            });
        });
        this.mediaRoutes.routes(app);
        this.appRoutes.routes(app);
    }
}
exports.Routes = Routes;
//# sourceMappingURL=index.js.map