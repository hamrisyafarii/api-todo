import jwt from "jsonwebtoken";

interface JwtPayload {
  id: string;
  username: string;
  email: string;
}

export function generateToken(payload: object) {
  return jwt.sign(payload, process.env.JWT_SECRET!, { expiresIn: "1d" });
}

export const verifyToken = (token: string): JwtPayload => {
  return jwt.verify(token, process.env.JWT_SECRET!) as JwtPayload;
};
