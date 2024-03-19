// Filename - Home.jsx
import './App.css'
import { RenderTodo } from './components/RenderTodo'
import { Todos } from './components/Todos'
import { Title } from './components/Title'
import { RecoilRoot } from 'recoil'
import { Search } from './components/Search'

const TodoPage = () => {

    return (
        <div>
            <RecoilRoot>
            <RenderTodo/>
            <Search/>
            <Todos />
            </RecoilRoot>
        </div>
    );
};

export default TodoPage;