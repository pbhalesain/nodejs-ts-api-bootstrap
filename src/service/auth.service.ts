
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import UserModel, { RegistrationInput } from '../models/user.model';
import { signJwt } from '../utils/jwt.utils';
import config from 'config';
import { createSession } from './session.service';

interface AuthReponse {
  accessToken: string
  refreshToken: string
}
export class AuthService {

    jwtSecret = process.env.JWT_SECRET || 'secret';

      register = async (userData: RegistrationInput): Promise<RegistrationInput> => {
    const existingUser = await UserModel.findOne({ email: userData.email });
    if (existingUser) {
      throw new Error('Email already registered');
    }

    const hashedPassword = await bcrypt.hash(userData.password, 10);
    const user = await UserModel.create({ ...userData, password: hashedPassword });
    return user;
  };

  login = async (email: string, password: string, userAgent: string): Promise<AuthReponse> => {
    const user = await UserModel.findOne({ email });
    if (!user) {
      throw new Error('Invalid email or password');
    }

    const isPasswordValid = await user.comparePassword(password);
    if (!isPasswordValid) {
      throw new Error('Invalid email or password');
    }
    const session = await createSession(user._id, userAgent);

    //create an access token
    const accessTokenExpiresIn = config.get<string>("accessTokenExpiresIn"); //15 mins
    const accessToken = signJwt(
      { ...user, session: session._id },
      "accessTokenPrivateKey",
      { expiresIn: accessTokenExpiresIn }
    );
    //create a refresh token

    const refreshTokenExpiresIn = config.get<string>("accessTokenExpiresIn"); // 15 mins
    const refreshToken = signJwt(
      { ...user, session: session._id },
      "accessTokenPrivateKey",
      { expiresIn: refreshTokenExpiresIn }
    );

    //return an access and refresh token
    return { accessToken, refreshToken };
  };
}