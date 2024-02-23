// Filename - Home.jsx
import { useState,useEffect } from 'react'
import './App.css'
import { RenderTodo } from './components/RenderTodo'
import { Todos } from './components/Todos'
import { Title } from './components/Title'

// Importing Link from react-router-dom to 
// navigate to different end points.
 
export const TodoPage = () => {
    const [todo,setTodo] = useState([])

    return (
        <div>
            <Title/>
            <RenderTodo todo = {todo} setTodo = {setTodo}> </RenderTodo>
            <Todos setTodo = {setTodo} todos={todo}></Todos>
        </div>
    );
};
 
export default TodoPage;