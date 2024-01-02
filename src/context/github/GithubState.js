import {
	CLEAR_USERS,
	GET_REPOS,
	GET_USER,
	SEARCH_USERS,
	SET_LOADING,
} from '../types';
import React, { useReducer } from 'react';

import GithubContext from './githubContext';
import GithubReducer from './githubReducer';
import axios from 'axios';

const GithubState = (props) => {
	const initialState = {
		users: [],
		user: {},
		repos: [],
		loading: false,
	};

	const [state, dispatch] = useReducer(GithubReducer, initialState);

	// Search Users
	const searchHandler = async (text) => {
		setLoading();

		console.log('Received: ' + text);

		try {
			const res = await axios.get(
				`https://api.github.com/search/users?q=${text}&client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}&client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`
			);

			dispatch({
				type: SEARCH_USERS,
				payload: res.data.items,
			});
		} catch (error) {
			console.error('Failed to fetch data:', error);
		}
	};

	// Get User
	const getUser = async (username) => {
		setLoading();

		try {
			const res = await axios.get(
				`https://api.github.com/users/${username}?client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}&client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`
			);

			dispatch({
				type: GET_USER,
				payload: res.data,
			});
		} catch (error) {
			console.error('Failed to retrieve the user', error);
		}
	};

	// Get Repos
	const getUserRepos = async (username) => {
		setLoading();

		try {
			const res = await axios.get(
				`https://api.github.com/users/${username}/repos?per_page=5&sort=created:asc&client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}&client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`
			);

			dispatch({
				type: GET_REPOS,
				payload: res.data,
			});
		} catch (error) {
			console.error('Failed to retrieve the user', error);
		}
	};

	// Clear Users
	const clearHandler = () => dispatch({ type: CLEAR_USERS });

	// Set Loading
	const setLoading = () => dispatch({ type: SET_LOADING });

	return (
		<GithubContext.Provider
			value={{
				users: state.users,
				user: state.user,
				repos: state.repos,
				loading: state.loading,
				searchHandler,
				clearHandler,
				getUser,
				getUserRepos,
			}}
		>
			{props.children}
		</GithubContext.Provider>
	);
};

export default GithubState;
