import { NextFunction, Request, Response, Router } from "express";
import Controller from "../../utils/interfaces/controller.interface";

class AuthController implements Controller {
    public path = '/auth';
    public router = Router();

    constructor() {
        this.initialiseRoutes();
    }
    initialiseRoutes() {
        this.router.get(`${this.path}`,this.auth);
        this.router.post(
            `${this.path}`,this.register
        );
        this.router.post(
            `${this.path}`,this.login
        );
    }

    private auth = (
        req: Request,
        res: Response,
        next: NextFunction
    ): Response | void => {
        res.status(200).send('Auth Controller is working.\n');
    };

    private register = (
        req: Request,
        res: Response,
        next: NextFunction
    ): Response | void => {
        res.status(200).send('Auth Controller is working.\n');
    };

    private login = (
        req: Request,
        res: Response,
        next: NextFunction
    ): Response | void => {
        res.status(200).send('Auth Controller is working.\n');
    };
    
    
}
export default AuthController;