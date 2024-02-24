
import "./App.css";

import {BrowserRouter,Routes,Route} from "react-router-dom";
import {Page404} from './Page404'
import { LoginPage } from "./LoginPage";
import {RouterMain} from './components/RouterMain'
import React, { Suspense } from 'react'

const TodoPage = React.lazy(()=>import('./TodoPage'));

function App() {
	
	return (
		<>
			<BrowserRouter>
			<RouterMain/>
			<Routes>
				<Route path='/' element = {<Suspense fallback={'Loading'}><LoginPage/></Suspense>}/>
				<Route path='/mytodos' element = {<Suspense fallback={'Loading'}><TodoPage/></Suspense>}/>
				<Route path='*' element={<Page404/>}/>
			</Routes>
			</BrowserRouter>
		</>
	);
}

export default App;
