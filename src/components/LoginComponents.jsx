import {memo} from 'react'

export const LoginComponents = memo(()=>{
  
    return <div>
        <span style={{fontWeight:900}}>Username</span> <input type = "text" style={{padding:20,borderRadius:5,border:"solid 1px white",margin:10}}/> 
        <br/>
        <span style={{fontWeight:900}}>Password</span> <input type = "password"  style={{padding:20,borderRadius:5,border:"solid 1px white",margin:10}}/> 
        <br/>
        <button style={{margin:10}}>Login</button>
    </div>
})