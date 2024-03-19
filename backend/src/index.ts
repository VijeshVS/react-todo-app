import express from "express";
import { PrismaClient } from "@prisma/client";
import jwt from 'jsonwebtoken'
import { jwtPassword } from "./config";
import { authMiddleware } from "./authMiddleware";
import { todo } from "node:test";

const app = express();
const prisma = new PrismaClient();

app.use(express.json())

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

app.post('/api/v1/todos',async(req,res)=>{
    const userId:any = req.headers.userId

    const title:string = req.body.title;
    const description:string = req.body.description;

    const todo = await prisma.todos.create({
        data: {
            title: title,
            description: description,
            userId : userId
        }
    })

    res.send({
        msg : "Todo created successfully",
        todo
    })
})

app.put('/api/v1/todos',async(req,res)=>{
    const todoId = req.body.todoId;
    const title = req.body.title;
    const description = req.body.description;

    const updater = {
        title : '',
        description: ''
    }

    if(title) updater.title = title
    if(description) updater.description = description

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

app.delete("/api/v1/todos",async(req,res)=>{
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
