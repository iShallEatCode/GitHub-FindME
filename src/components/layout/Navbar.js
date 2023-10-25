import React from 'react'
import PropTypes from 'prop-types'
import { BsGithub as GitHubIcon } from 'react-icons/bs'

const Navbar = ({ title }) => {
	return (
		<nav className='navbar bg-primary'>
			<h1>
				<GitHubIcon /> {title}
			</h1>
		</nav>
	)
}

Navbar.defaultProps = {
	title: 'Github Finder Default',
	// icon: {GitHubIcon},
}

Navbar.propTypes = {
	title: PropTypes.string.isRequired,
}

export default Navbar
