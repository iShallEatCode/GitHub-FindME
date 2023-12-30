import React, { useContext } from 'react';

import GithubContext from '../../context/github/githubContext';
import Spinner from '../layout/Spinner';
import UserItem from './UserItem';

const Users = () => {
	const githubContext = useContext(GithubContext);

	const { loading, users } = githubContext;

	return loading ? (
		<Spinner />
	) : (
		<div className='user-grid'>
			{users.map((user) => (
				<UserItem key={user.id} user={user} />
			))}
		</div>
	);
};

export default Users;
