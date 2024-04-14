import { NextFunction, Request, Response } from "express";

const requireUser = (req: Request, res: Response, next: NextFunction) => {
  const user = res.locals.user;
  
  if (!user) {
    return res.sendStatus(403);
  }else{
    console.log(`the user still exists ${user}`);
  }
  next();
};

export default requireUser;
