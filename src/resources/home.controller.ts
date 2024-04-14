import { NextFunction, Request, Response, Router } from "express";
import Controller from "../utils/interfaces/controller.interface";

class HomeController implements Controller {
    public path = '/';
    public router = Router();

    constructor() {
        this.initialiseRoutes();
    }
    initialiseRoutes() {
        this.router.get(`${this.path}`,this.home);
    }

    private home = (
        req: Request,
        res: Response,
        next: NextFunction
    ): Response | void => {
        res.status(200).send('Application is running, send requests.\n');
    };
    
    
}
export default HomeController;