import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

interface JwtPayload {
  username: string;
}

export const authenticateToken = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  // TODO (COMPLETE): verify the token exists and add the user data to the request object
  const requestHeader = req.headers["authorization"];
  const jwtToken = requestHeader && requestHeader.split(" ")[1];
  if (jwtToken === undefined)
    return res.status(401).json({ message: "No JWT Token" });

  jwt.verify(jwtToken, process.env.JWT_SECRET_KEY || "", (error, user) => {
    if (error) return res.status(403).json({ message: "Bad Token" });
    req.user = user as JwtPayload;
    next();
    return;
  });
  return undefined;
};
