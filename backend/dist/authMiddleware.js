"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authMiddleware = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const authMiddleware = (req, res, next) => {
    const auth_string = req.headers.authorization;
    const token = auth_string.split(" ")[1];
    if (!token) {
        return res.status(403).json({
            msg: "User not authorized"
        });
    }
    const response = jsonwebtoken_1.default.decode(token);
    req.headers.userId = response.id;
    next();
};
exports.authMiddleware = authMiddleware;
