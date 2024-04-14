import { Request, Response } from 'express';
import { AuthService } from '../service/auth.service';
import { RegisterValidation } from '../schema/auth.schema';

export class AuthController {
  private authService: AuthService;

  constructor() {
    this.authService = new AuthService();
  }

  register = async (req: Request, res: Response) => {
    console.log("Inside register method")
    const validationResult = await RegisterValidation.validate(req.body);
    if (validationResult.error) {
      return res.status(400).json({ error: validationResult.error.details });
    }

    try {
      const user = await this.authService.register(req.body);
      res.status(201).json(user);
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  };

  login = async (req: Request, res: Response) => {
    try {
      const { email, password } = req.body;
      const userAgent = req.get("user-agent") || "";
      const token = await this.authService.login(email, password,userAgent);
      res.json({ token });
    } catch (error: any) {
      res.status(401).json({ error: error.message });
    }
  };
}