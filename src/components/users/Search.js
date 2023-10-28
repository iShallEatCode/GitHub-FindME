import React, { useState } from 'react'

const Search = (props) => {
	const [text, setText] = useState('')

	const onChangeHandler = (e) => {
		setText(e.target.value)
	}

  const onSubmitHandler = (e) => {
    e.preventDefault()
		props.searchUsers(text)
		setText('')
    console.log("Submitted")
  }

	return (
		<div>
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
		</div>
	)
}

export default Search
