import { useNavigate } from "react-router-dom";

export function RouterMain(){
    const navigate = useNavigate();

    return <div>
    <button onClick={()=>navigate('/')}> Login Page </button>
    <button onClick = {()=>navigate('/mytodos')} > MyTodos  </button>
    </div>
}