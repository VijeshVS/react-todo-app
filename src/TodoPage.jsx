// Filename - Home.jsx
import { useState,useEffect } from 'react'
import './App.css'
import { RenderTodo } from './components/RenderTodo'
import { Todos } from './components/Todos'
import { Title } from './components/Title'
import { RecoilRoot } from 'recoil'

const TodoPage = () => {
    
    return (
        <div>
            <RecoilRoot>
            <Title/>
            <RenderTodo/>
            <Todos />
            </RecoilRoot>
        </div>
    );
};

export default TodoPage;