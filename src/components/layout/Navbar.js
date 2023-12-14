import React from 'react';
import { Link, Outlet } from 'react-router-dom';
import PropTypes from 'prop-types';
import { BsGithub as GitHubIcon } from 'react-icons/bs';

const Navbar = ({ title }) => {
	return (
		<div>
			<nav className='navbar bg-primary'>
				<h1>
					<GitHubIcon /> {title}
				</h1>
				<ul>
					<li>
						<Link to='/'>Home</Link>
					</li>
					<li>
						<Link to='/about'>About</Link>
					</li>
				</ul>
			</nav>
			<Outlet />
		</div>
	);
};

Navbar.defaultProps = {
	title: 'Github Finder',
};

Navbar.propTypes = {
	title: PropTypes.string.isRequired,
};

export default Navbar;
