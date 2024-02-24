// Filename - Home.jsx
import { useState,useEffect } from 'react'
import './App.css'
import { RenderTodo } from './components/RenderTodo'
import { Todos } from './components/Todos'
import { Title } from './components/Title'
import { todoContext } from './components/context'

const TodoPage = () => {
    const [todo,setTodo] = useState([])

    return (
        <div>
            <todoContext.Provider value = {todo} >
            <Title/>
            <RenderTodo setTodo = {setTodo}> </RenderTodo>
            <Todos setTodo = {setTodo} ></Todos>

            </todoContext.Provider>
        </div>
    );
};

export default TodoPage;