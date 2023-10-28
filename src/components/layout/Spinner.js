import React, { Fragment } from 'react'
import spinnerOne from '../media/spinnerOne.gif'
import spinnerTwo from '../media/spinnerTwo.gif'
import spinnerThree from '../media/spinnerThree.gif'

const Spinner = () => {
	return (
		<Fragment>
			<img
				src={spinnerOne}
				alt='Loading...'
				style={{ width: '200px', margin: 'auto', display: 'block' }}
			/>
		</Fragment>
	)
}

export default Spinner
