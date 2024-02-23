
import {memo} from 'react'
import { useNavigate } from "react-router-dom";

export const RouterMain = memo(()=>{
    const navigate = useNavigate();

    return <div>
    <button onClick={()=>navigate('/')}> Login Page </button>
    <button onClick = {()=>navigate('/mytodos')} > MyTodos  </button>
    </div>
})