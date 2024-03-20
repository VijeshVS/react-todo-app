import express from "express";
import { PrismaClient } from "@prisma/client";
import jwt from 'jsonwebtoken'
import { jwtPassword } from "./config";
import { authMiddleware } from "./authMiddleware";
import cors from 'cors'

const app = express();
const prisma = new PrismaClient();

app.use(express.json())
app.use(cors())

app.post('/api/v1/register',async (req,res)=>{
    const username:string = req.body.username;
    const password:string  = req.body.password;
    const email:string = req.body.email;

    try{
        const response = await prisma.user.create({
            data:{
                userName:username,
                email:email,
                password:password
            }
        })

        const token = jwt.sign({id:response.id,username:response.userName},jwtPassword);

        res.status(200).json({
            msg:"User created successfully",
            token : token
        })
    }
    catch(e){
        return res.status(411).json({
            msg : "Invalid Inputs / User or email already exists"
        })
    }

   
})

app.post('/api/v1/login',async (req,res)=>{
    const username:string = req.body.username;
    const password:string = req.body.password;

        const response = await prisma.user.findFirst({
            where : {
                password : password,
                userName : username
            }
        })


    if(!response){
        return res.status(400).json({
            msg : "Invalid credentials"
        })
    }

    const token = jwt.sign({id:response?.id,username:response.userName},jwtPassword)

    res.status(200).send({
        msg: "User logged in successfully!!",
        token
    })
        
})

app.get('/api/v1/todos',authMiddleware, async (req,res)=>{

    const userId:any = req.headers.userId;
    const todos = await prisma.todos.findMany({
        where:{
            userId : userId
        }
    })

    res.status(200).json({
        todos
    })
})

app.post('/api/v1/todos',authMiddleware,async(req,res)=>{
    const userId:any = req.headers.userId
    const title:string = req.body.title;
    const description:string = req.body.description;

    const todo = await prisma.todos.create({
        data: {
            title: title,
            description: description,
            userId : userId,
            completed: false
        }
    })

    res.send({
        msg : "Todo created successfully",
        todo
    })
})

app.post('/api/v1/todos/update',async(req,res)=>{
    const todoId = req.body.todoId;
    const completed = req.body.completed

    const updater = {
        completed: false
    }

    if(completed) updater.completed = true

    await prisma.todos.update({
        where:{
            id:todoId
        },
        data:updater
    })

    res.status(200).send({
        msg : "Todo updated successfully"
    })

})

app.post("/api/v1/todos/delete",async(req,res)=>{
    const todoId = req.body.todoId;

    await prisma.todos.delete({
        where:{
            id: todoId
        }
    })

    res.status(200).json({
        msg: "Todo deleted successfully"
    })
})

app.listen(3000,()=>{
    console.log("App is listening in the port 3000")
})
