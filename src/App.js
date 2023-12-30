import './App.css';

import { Route, Routes } from 'react-router-dom';

import About from './components/pages/About';
import Alert from './components/layout/Alert';
import AlertState from './context/alert/AlertState';
import GithubState from './context/github/GithubState';
import Home from './components/pages/Home';
import Navbar from './components/layout/Navbar';
import NotFound from './components/pages/NotFound';
import React from 'react';
import User from './components/users/User';

const App = () => {
	return (
		<GithubState>
			<AlertState>
				<div className='App'>
					<Navbar />
					<div className='container'>
						<Alert />
						<Routes>
							<Route path='/' Component={<Home />} />
							<Route path='/about' Component={<About />} />
							<Route path='/user/:login' Component={<User />} />
							<Route Component={NotFound} />
						</Routes>
					</div>
				</div>
			</AlertState>
		</GithubState>
	);
};

export default App;
