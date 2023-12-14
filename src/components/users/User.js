import React, { useState, useEffect } from 'react';

const User = (props) => {
	const {
		name,
		avatar_url,
		location,
		bio,
		blog,
		login,
		html_url,
		followers,
		following,
		public_repos,
		public_gists,
		hireable,
	} = props.user;

	useEffect(() => {
		props.getUser(props.match.params.login);
	});

	return (
		<div>{name}</div>
	);
};

export default User;
