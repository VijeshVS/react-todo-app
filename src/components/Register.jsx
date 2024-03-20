import { useState } from "react";
import { Spinner } from './Spinner';
import { useNavigate } from "react-router-dom";
import axios from 'axios'
import {backendUrl} from '../config'

export const Register = () =>{
    const [user,setUser] = useState("");
    const [pass,setPass] = useState("");
    const [mail,setMail] = useState("");
    const [load,setLoad] = useState(false);
    const navigate = useNavigate();

    const registerFn = async ()=>{
        setLoad(true)
        try{
            const response = await axios.post(backendUrl+'/register',{
                username: user,
                password: pass,
                email: mail
            })
            //notification of login
            // alert("Sucessfully logged in!!")
            localStorage.setItem('token',"Bearer "+response.data.token);
            setLoad(false)
            navigate('/mytodos')
        }
        catch(e){
            // alert("Some error has occured!!")
            console.log(e)
        }
    }

    return <section className='drop-shadow-lg w-screen justify-center items-center min-h-screen flex '>
        <div className='bg-gray-100 flex rounded-2xl'>
            <div className='md:w-1/2 p-3'>
                <h2 className='text-center font-bold text-3xl mt-3 text-gray-700'>Register</h2>
                <h2 className='text-center mt-2 text-md text-gray-400'>Fill the details to get started</h2>
                <div className='mt-10 flex justify-center flex-col p-8'>
                <input value = {user} onChange={(e)=>setUser(e.target.value)} className='h-9 border-2 rounded-xl pl-2 text-md border-gray-400' placeholder = 'Enter your username' type='text'/>
                <br />
                <input value={mail} onChange={(e)=>setMail(e.target.value)} className='h-9 border-2 rounded-xl pl-2 text-md border-gray-400' placeholder = 'Enter your email' type='email'/>
                <br />
                <input value={pass} onChange={(e)=>setPass(e.target.value)} className='h-9 border-2 rounded-xl pl-2 text-md border-gray-400' placeholder='Enter your password' type='password'/>
                </div>
                <div className='flex justify-center'>
                <button onClick={registerFn} className='rounded-xl w-20 h-9 hover:scale-105 bg-black text-white font-bold text-md'>Signup</button>
                </div>
                <div className='flex mt-4 justify-center'>
                <div className='text-sm text-center text-gray-600'>Already have an account? </div> <div className='text-sm ml-1 text-blue-700 underline cursor-pointer' onClick={()=>{
                    navigate('/')
                }}>Login</div>
                </div>
                {load?<div className='flex justify-center mt-6'>
                <Spinner/>
                </div>:<div></div>}
            </div>
            <div className='md:w-1/2'>
                <img className= 'max-md:hidden md:p-3 md:rounded-3xl' style={{width:'28rem',height:'32rem'}} src="https://images.unsplash.com/photo-1578926314433-e2789279f4aa?q=80&w=2821&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"/>
            </div>
        </div>
    </section>
}