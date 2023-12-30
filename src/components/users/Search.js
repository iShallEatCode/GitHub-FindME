import React, { useContext, useState } from 'react';

import AlertContext from '../../context/alert/alertContext';
import GithubContext from '../../context/github/githubContext';

const Search = (props) => {
	const githubContext = useContext(GithubContext);
	const alertContext = useContext(AlertContext);

	const [text, setText] = useState('');

	const onSubmitHandler = (e) => {
		e.preventDefault();
		if (text) {
			githubContext.searchUsers(text);
			setText('');
		} else {
			alertContext.setAlert('Please enter something', 'light');
		}
	};

	const onChangeHandler = (e) => {
		setText(e.target.value);
	};

	return (
		<div className=''>
			<form className='form' onSubmit={onSubmitHandler}>
				<input
					type='text'
					name='text'
					placeholder='Search Users...'
					value={text}
					onChange={onChangeHandler}
				/>
				<input
					type='submit'
					value='Search'
					className='btn btn-dark btn-block'
				/>
			</form>
			{githubContext.users.length > 0 && (
				<button
					className='btn btn-light btn-block'
					onClick={githubContext.clearUsers}
				>
					Clear
				</button>
			)}
		</div>
	);
};

export default Search;
