"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const client_1 = require("@prisma/client");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const config_1 = require("./config");
const authMiddleware_1 = require("./authMiddleware");
const cors_1 = __importDefault(require("cors"));
const app = (0, express_1.default)();
const prisma = new client_1.PrismaClient();
app.use(express_1.default.json());
app.use((0, cors_1.default)());
app.post('/api/v1/register', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const username = req.body.username;
    const password = req.body.password;
    const email = req.body.email;
    try {
        const response = yield prisma.user.create({
            data: {
                userName: username,
                email: email,
                password: password
            }
        });
        const token = jsonwebtoken_1.default.sign({ id: response.id, username: response.userName }, config_1.jwtPassword);
        res.status(200).json({
            msg: "User created successfully",
            token: token
        });
    }
    catch (e) {
        return res.status(411).json({
            msg: "Invalid Inputs / User or email already exists"
        });
    }
}));
app.post('/api/v1/login', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const username = req.body.username;
    const password = req.body.password;
    const response = yield prisma.user.findFirst({
        where: {
            password: password,
            userName: username
        }
    });
    if (!response) {
        return res.status(400).json({
            msg: "Invalid credentials"
        });
    }
    const token = jsonwebtoken_1.default.sign({ id: response === null || response === void 0 ? void 0 : response.id, username: response.userName }, config_1.jwtPassword);
    res.status(200).send({
        msg: "User logged in successfully!!",
        token
    });
}));
app.get('/api/v1/todos', authMiddleware_1.authMiddleware, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const userId = req.headers.userId;
    const todos = yield prisma.todos.findMany({
        where: {
            userId: userId
        }
    });
    res.status(200).json({
        todos
    });
}));
app.post('/api/v1/todos', authMiddleware_1.authMiddleware, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const userId = req.headers.userId;
    const title = req.body.title;
    const description = req.body.description;
    const todo = yield prisma.todos.create({
        data: {
            title: title,
            description: description,
            userId: userId,
            completed: false
        }
    });
    res.send({
        msg: "Todo created successfully",
        todo
    });
}));
app.post('/api/v1/todos/update', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const todoId = req.body.todoId;
    const completed = req.body.completed;
    const updater = {
        completed: false
    };
    if (completed)
        updater.completed = true;
    yield prisma.todos.update({
        where: {
            id: todoId
        },
        data: updater
    });
    res.status(200).send({
        msg: "Todo updated successfully"
    });
}));
app.post("/api/v1/todos/delete", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const todoId = req.body.todoId;
    yield prisma.todos.delete({
        where: {
            id: todoId
        }
    });
    res.status(200).json({
        msg: "Todo deleted successfully"
    });
}));
app.listen(3000, () => {
    console.log("App is listening in the port 3000");
});
