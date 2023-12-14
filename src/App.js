import React, { useState, useEffect, Fragment } from 'react';
import { Routes, Route, Outlet, Link } from 'react-router-dom';
import axios from 'axios';
import Navbar from './components/layout/Navbar';
import Users from './components/users/Users';
import User from './components/users/User';
import Search from './components/users/Search';
import Alert from './components/layout/Alert';
import './App.css';
import About from './components/pages/About';

function App() {
	const [users, setUsers] = useState([]);
	const [user, setUser] = useState({});
	const [loading, setLoading] = useState(false);
	const [alert, setAlert] = useState(null);

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
							<Fragment>
								<Search
									searchUsers={searchHandler}
									clearUsers={clearHandler}
									showClear={users.length ? true : false}
									setAlert={alertHandler}
								/>
								<Users loading={loading} users={users} />
							</Fragment>
						}
					/>
					<Route path='about' element={<About />} />
					<Route path='/user/:login' render={props => (
						<User { ...props } getUser={getUser} user={user} loading={loading} />
					)} />
				</Routes>
			</div>
		</div>
	);
}

export default App;
