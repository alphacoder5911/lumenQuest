import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET || "supersecret";

export const authMiddleware = (requiredRoles = []) => {
  return (req, res, next) => {
    try {
      const authHeader = req.headers.authorization;

      if (!authHeader || !authHeader.startsWith("Bearer ")) {
        return res.status(401).json({
          success: false,
          message: "Access token required"
        });
      }

      const token = authHeader.substring(7); // Remove 'Bearer ' prefix

      if (!token) {
        return res.status(401).json({
          success: false,
          message: "Access token required"
        });
      }

      const decoded = jwt.verify(token, JWT_SECRET);
      req.user = decoded;

      // Check if user has required role
      if (requiredRoles.length > 0 && !requiredRoles.includes(decoded.role)) {
        return res.status(403).json({
          success: false,
          message: "Insufficient permissions"
        });
      }

      next();
    } catch (error) {
      if (error.name === "TokenExpiredError") {
        return res.status(401).json({
          success: false,
          message: "Token has expired"
        });
      }

      if (error.name === "JsonWebTokenError") {
        return res.status(401).json({
          success: false,
          message: "Invalid token"
        });
      }

      return res.status(500).json({
        success: false,
        message: "Token verification failed"
      });
    }
  };
};

export const requireAdmin = authMiddleware(["ADMIN"]);
export const requireAuth = authMiddleware();