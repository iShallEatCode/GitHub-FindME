import './App.css';

import React, { useEffect, useState } from 'react';
import { Route, Routes } from 'react-router-dom';

import About from './components/pages/About';
import Alert from './components/layout/Alert';
import Navbar from './components/layout/Navbar';
import Search from './components/users/Search';
import User from './components/users/User';
import Users from './components/users/Users';
import axios from 'axios';

function App() {
	const [users, setUsers] = useState([]);
	const [user, setUser] = useState({});
	const [loading, setLoading] = useState(false);
	const [alert, setAlert] = useState(null);
	const [repos, setRepos] = useState([]);

	const fetchData = async () => {
		setLoading(true);

		// Fetch user data
		try {
			console.log('Fetching user data');
			const res = await axios.get(
				`https://api.github.com/users?client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}&client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`
			);

			setUsers(res.data);
			setLoading(false);
		} catch (error) {
			console.error('Failed to fetch data:', error);
		}
	};

	useEffect(() => {
		fetchData();
	}, []);

	// Fetch user search data
	const searchHandler = async (text) => {
		setLoading(true);

		console.log('Received: ' + text);

		try {
			const res = await axios.get(
				`https://api.github.com/search/users?q=${text}&client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}&client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`
			);

			setUsers(res.data.items);
			setLoading(false);
		} catch (error) {
			console.error('Failed to fetch data:', error);
		}
	};

	// Get single Github user
	const getUser = async (username) => {
		setLoading(true);

		try {
			const res = await axios.get(
				`https://api.github.com/users/${username}?client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}&client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`
			);

			setUser(res.data);
			setLoading(false);
		} catch (error) {
			console.error('Failed to retrieve the user', error);
		}
	};

	// Get user repos
	const getUserRepos = async (username) => {
		setLoading(true);

		try {
			const res = await axios.get(
				`https://api.github.com/users/${username}/repos?per_page=5&sort=created:asc&client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}&client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`
			);

			setRepos(res.data);
			setLoading(false);
		} catch (error) {
			console.error('Failed to retrieve the user', error);
		}
	};

	// Clear users from state
	const clearHandler = () => {
		setUsers([]);
		setLoading(false);
	};

	// Set alert handler
	const alertHandler = (msg, type) => {
		setAlert({
			msg: msg,
			type: type,
		});

		setTimeout(() => setAlert(null), 5000);
	};

	return (
		<div className='App'>
			<Navbar />
			<div className='container'>
				<Alert alert={alert} />
				<Routes>
					<Route
						path='/'
						element={
							<>
								<Search
									searchUsers={searchHandler}
									clearUsers={clearHandler}
									showClear={users.length ? true : false}
									setAlert={alertHandler}
								/>
								<Users loading={loading} users={users} />
							</>
						}
					/>
					<Route path='/about' element={<About />} />
					<Route
						exact
						path='/user/:login'
						element={
							<User
								getUser={getUser}
								getUserRepos={getUserRepos}
								user={user}
								repos={repos}
								loading={loading}
							/>
						}
					/>
				</Routes>
			</div>
		</div>
	);
}

export default App;
