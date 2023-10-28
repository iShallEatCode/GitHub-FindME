import React, { useState, useEffect } from 'react'
import axios from 'axios'
import Navbar from './components/layout/Navbar'
import Users from './components/users/Users'
import Search from './components/users/Search'
import './App.css'

function App() {
	const [users, setUsers] = useState([])
	const [loading, setLoading] = useState(false)

	const fetchData = async () => {
		console.log(process.env.REACT_APP_GITHUB_CLIENT_SECRET)

		setLoading(true)

		try {
			const res = await axios.get(
				`https://api.github.com/users?client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}&client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`
			);

			setUsers(res.data)
			setLoading(false)
		} catch (error) {
			console.error('Failed to fetch data:', error)
		}
	}

	useEffect(() => {
		fetchData()
	}, [])


	const searchHandler = (text) => {
		console.log("Received: " + text);
	}

	return (
		<div className='App'>
			<Navbar />
			<div className='container'>
				<Search searchUsers={searchHandler} />
				<Users loading={loading} users={users} />
			</div>
		</div>
	)
}

export default App
