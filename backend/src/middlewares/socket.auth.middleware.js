import jwt from "jsonwebtoken";
import "dotenv/config";
import User from "../models/User.js";

export const socketAuthMiddleware = async (socket, next) => {
  try {
    //cookie: "jwt=abc123; theme=dark; sessionId=xyz789"
    const token = socket.handshake.headers.cookie
      ?.split("; ")
      .find((row) => row.startsWith("jwt="))
      ?.split("=")[1];

    if (!token) {
      console.log("Socket connection rejected: No token provided.");
      return next(new Error("Unauthorized - No Token Provided"));
    }

    let decoded;
    try {
      decoded = jwt.verify(token, JWT_SECRET);
    } catch (err) {
      const msg =
        err.name === "TokenExpiredError"
          ? "Unauthorized — Token expired"
          : "Unauthorized — Invalid token";
      console.log("Socket connection rejected: ", msg);
      return next(new Error(msg));
    }

    const user = await User.findById(decoded.userId).select("-password");
    if (!user) {
      console.log("Socket connection rejected: User not found");
      return next(new Error("User not found"));
    }

    socket.user = user;
    socket.userId = user._id.toString();

    console.log(
      `Socket authenticated for user: ${user.fullName} (${user._id})`,
    );

    next();
  } catch (error) {
    console.log("Error in socket authentication:", error.message);
    next(new Error("Unauthorized = Authentication failed"));
  }
};
