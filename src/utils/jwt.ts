import jwt from "jsonwebtoken";

const KEY_SECRET: string = process.env.JWT_SECRET as string;

if (!KEY_SECRET) {
  throw new Error("JWT_SECRET is not defined in .env");
}

export function generateToken(payload: object) {
  return jwt.sign(payload, KEY_SECRET, { expiresIn: "1d" });
}
