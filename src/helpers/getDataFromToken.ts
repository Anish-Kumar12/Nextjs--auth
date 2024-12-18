import { NextRequest } from "next/server";
import jwt from "jsonwebtoken";

export const getDataFromToken = (request: NextRequest) => {
  try {
    const encodedToken = request.cookies.get("token")?.value || '';
    if (!encodedToken) {
      throw new Error("Token not found");
    }
    const decodedToken: any = jwt.verify(encodedToken, process.env.TOKEN_SECRET!);
    return decodedToken.id;
  } catch (error: any) {
    console.error("Error decoding token:", error.message);
    throw new Error("Invalid token");
  }
};