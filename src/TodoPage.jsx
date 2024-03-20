// Filename - Home.jsx
import './App.css'
import { RenderTodo } from './components/RenderTodo'
import { Todos } from './components/Todos'
import { RecoilRoot } from 'recoil'
import { useState } from 'react'

const TodoPage = () => {
    const [update,setUpdate] = useState(false)
    return (
        <div>
            <RecoilRoot>
            <RenderTodo setUpdate={setUpdate}/>
            <Todos update={update} setUpdate={setUpdate}/>
            </RecoilRoot>
        </div>
    );
};

export default TodoPage;