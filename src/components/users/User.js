import { FaCheck, FaTimesCircle } from 'react-icons/fa';
import { Link, useParams } from 'react-router-dom';
import React, { Fragment, useEffect, useState } from 'react';

import PropTypes from 'prop-types';
import Spinner from '../layout/Spinner';

const User = (props) => {
	const { login } = useParams();

	useEffect(() => {
		props.getUser(login);
	}, []);

	const {
		name,
		company,
		avatar_url,
		location,
		bio,
		blog,
		html_url,
		followers,
		following,
		public_repos,
		public_gists,
		hireable,
	} = props.user;

	if (props.loading) return <Spinner />;

	return (
		<Fragment>
			<Link to='/' className='btn btn-light'>
				Back to Search
			</Link>
			Hireable:{' '}
			{hireable ? (
				<FaCheck style={{ color: 'green', fontSize: '20px' }} />
			) : (
				<FaTimesCircle style={{ color: 'red', fontSize: '20px' }} />
			)}
			<div className='card grid-2'>
				<div className='all-center'>
					<img
						src={avatar_url}
						className='round-img'
						alt=''
						style={{ width: '150px' }}
					/>
					<h1>{name}</h1>
					<p>Location: {location}</p>
				</div>
				<div>
					{bio && (
						<Fragment>
							<h3>Bio</h3>
							<p>{bio}</p>
						</Fragment>
					)}
					<a href={html_url} className='btn btn-dark my-1'>
						Visit Github Profile
					</a>
					<ul>
						<li>
							{login && (
								<Fragment>
									<strong>Username: </strong>
									{login}
								</Fragment>
							)}
						</li>

						<li>
							{company && (
								<Fragment>
									<strong>Company: </strong>
									{company}
								</Fragment>
							)}
						</li>

						<li>
							{blog && (
								<Fragment>
									<strong>Website: </strong>
									{blog}
								</Fragment>
							)}
						</li>
					</ul>
				</div>
			</div>
			<div className='card text-center'>
				<badge className='badge badge-primary'>Followers: {followers}</badge>
				<badge className='badge badge-success'>Following: {following}</badge>
				<badge className='badge badge-light'>
					Public Repos: {public_repos}
				</badge>
				<badge className='badge badge-dark'>Public Gists: {public_gists}</badge>
			</div>
		</Fragment>
	);
};

User.propTypes = {
	loading: PropTypes.bool,
	user: PropTypes.object.isRequired,
	getUser: PropTypes.func.isRequired,
};

export default User;
