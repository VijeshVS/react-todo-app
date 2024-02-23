
import "./App.css";

import {BrowserRouter,Routes,Route} from "react-router-dom";
import {Page404} from './Page404'
import TodoPage from "./TodoPage";
import { LoginPage } from "./LoginPage";
import {RouterMain} from './components/RouterMain'

function App() {
	return (
		<>
			<BrowserRouter>
			<RouterMain/>
			<Routes>
				<Route path='/' element = {<LoginPage/>}/>
				<Route path='/mytodos' element = {<TodoPage/>}/>
				<Route path='*' element={<Page404/>}/>
			</Routes>
			</BrowserRouter>
		</>
	);
}

export default App;
