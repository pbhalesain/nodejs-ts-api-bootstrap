import config from "config";
import { Request, Response } from "express";
import { createSession, findSessions, updateSession } from "../service/session.service";
import { validatePassword } from "../service/user.service";
import { signJwt } from "../utils/jwt.utils";

export async function createSessionHandler(req: Request, res: Response) {
  //validate the user password
  const user = await validatePassword(req.body);
  if (!user) {
    return res.status(401).send("Invalid credentials");
  }
  //create a session object
  const userAgent = req.get("user-agent") || "";
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
  return res.send({ accessToken, refreshToken });
}

export async function getUserSessionsHandler(req: Request, res: Response) {
  const userId = res.locals.user._id;
  const sessions = await findSessions({ user: userId, valid: true });
  return res.send(sessions);
}

export async function deleteSessionHandler(req: Request, res: Response) {
  const sessionId = res.locals.user.session;
  await updateSession({ _id: sessionId }, { valid: false });
  res.locals.user = null;
  res.send({
    accessToken: null,
    refreshToken: null
  });

}
