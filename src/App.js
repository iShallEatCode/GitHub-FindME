import './App.css';

import Alert from './components/layout/Alert';
import AlertState from './context/alert/AlertState';
import GithubState from './context/github/GithubState';
import Navbar from './components/layout/Navbar';
import React from 'react';

const App = () => {
	return (
		<GithubState>
			<AlertState>
				<div className='App'>
					<Navbar />
					<Alert />
				</div>
			</AlertState>
		</GithubState>
	);
};

export default App;
