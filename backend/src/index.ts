import express from "express";
import { PrismaClient } from "@prisma/client";
import jwt from 'jsonwebtoken'

const app = express();
const prisma = new PrismaClient();

app.use(express.json())

app.post('/api/v1/register',async (req,res)=>{
    const username:string = req.body.username;
    const password:string  = req.body.password;
    const email:string = req.body.email;
    
    try{
        await prisma.user.create({
            data:{
                userName:username,
                email:email,
                password:password
            }
        })
    }
    catch(e){
        return res.status(411).json({
            msg : "Invalid Inputs / User or email already exists"
        })
    }

    res.status(200).json({
        msg:"User created successfully"
    })
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

    res.status(200).send({
        msg: "User logged in successfully!!"
    })
        
})

app.get('/api/v1/todos', async (req,res)=>{
    const authorization:any = req.headers.authorization
    const token:any = authorization.split("")[1]

    // decode the token and assign
    
    const todos = await prisma.todos.findMany({
        where:{
            userId : token
        }
    })

    res.status(200).json({
        todos
    })
})

app.post('/api/v1/todos',async(req,res)=>{
    const authorization:any = req.headers.authorization
    const token:any = authorization.split("")[1]
    const title:string = req.body.title;
    const description:string = req.body.descripton;

    await prisma.todos.create({
        data: {
            title: title,
            description: description,
            userId : token
        }
    })

})

app.listen(3000,()=>{
    console.log("App is listening in the port 3000")
})
