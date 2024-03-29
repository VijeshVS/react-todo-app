
import "./App.css";

import {BrowserRouter,Routes,Route} from "react-router-dom";
import {Page404} from './Page404'
import { LoginPage } from "./LoginPage";
import React, { Suspense } from 'react'
import { Register } from "./components/Register";

const TodoPage = React.lazy(()=>import('./TodoPage'));

function App() {
	
	return (
		<>
			<BrowserRouter>
			<Routes>
				<Route path='/' element = {<Suspense fallback={'Loading'}><LoginPage/></Suspense>}/>
				<Route path='/mytodos' element = {<Suspense fallback={'Loading'}><TodoPage/></Suspense>}/>
				<Route path='/register' element = {<Register/>} />
				<Route path='*' element={<Page404/>}/>
			</Routes>
			</BrowserRouter>
		</>
	);
}

export default App;
