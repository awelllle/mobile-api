import { Request, Response } from "express";
import { AppRoutes } from "./app";
import { MediaRoutes } from './media';

export class Routes {
  public appRoutes: AppRoutes = new AppRoutes();
  public mediaRoutes: MediaRoutes = new MediaRoutes();
  
  public routes(app): void {
    app.route("/").get((req: Request, res: Response) => {
      res.status(200).send({
        message: "APIs are up and running!",
      });
    });

    this.mediaRoutes.routes(app)
    this.appRoutes.routes(app);
    
  }
}