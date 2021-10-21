import React, { useEffect, useState } from 'react'
import { useHistory } from 'react-router'
import '../styles/Submit.css'
import { Timestamp } from '@firebase/firestore'
import { storePost } from './Firebase'
import { formatDistance } from 'date-fns'

const Submit = ({loggedInUser, isLoggedIn, storedPosts, setStoredPosts}) => {
	
	const history = useHistory()

	const [postContent, setPostContent] = useState({
		author: loggedInUser,
		upvotes: 0,
	})	

	const [error, setError] = useState('')
	const [formSubmitted, setFormSubmitted] = useState(false)

	const handleChange = (e) => {

		setPostContent({
			...postContent,
			[e.target.name]: e.target.value,

		})
	}

	const postValidation = () => {
		if (postContent.title === undefined) {
			setError('Title cannot be empty.')
		} else if (postContent.text === undefined) {
			setError('Text cannot be empty.')
		} else {
			setFormSubmitted(true)
			return true
		}
	}
	
	const handlePostClick = () => {
		if (isLoggedIn === true && postValidation() === true) {
			setPostContent({
				...postContent,
				author: loggedInUser,
				date: new Date(),
			})
			storePost(
				postContent.title,
				postContent.text,
				postContent.author,
				postContent.upvotes,
				Timestamp.fromDate(new Date())
			)
			setStoredPosts((prevState) => [
				...prevState,
				{
					title: postContent.title,
					text: postContent.text,
					author: postContent.author,
					upvotes: postContent.upvotes,
					date: formatDistance(new Date(), new Date())
				},
		])
			history.push('/fakeddit/')
		} else if (!isLoggedIn) {
			setError('You must be logged in to post !')
		}
	}

	return (
		<div className='submit-container'>
			<div className='submit-new-post-container'>
				<div className='submit-header'>
					<h4>Create a post</h4>
				</div>

				<div className='submit-new-post'>
					<div className='submit-selector'>
						<button
							type='button'
							className='selector-button post-button'>
							Post
						</button>
						<button
							type='button'
							className='selector-button image-button'>
							Image
						</button>
						<button
							type='button'
							className='selector-button url-button'>
							URL
						</button>
					</div>

					<input
						type='text'
						name='title'
						placeholder='Title'
						onChange={(e) => handleChange(e)}
					/>

					<textarea
						name='text'
						rows='5'
						cols='85'
						placeholder='Text'
						onChange={(e) => handleChange(e)}
					/>

					{!formSubmitted && (
						<span
							style={{
								marginTop: 20,
								fontSize: 14,
								color: '#ea0027',
							}}>
							{error}
						</span>
					)}

					<div className='submit-buttons-div'>
						<button type='button' className='cancel-submit-button'>
							CANCEL
						</button>
						<button
							type='button'
							className='add-submit-button'
							onClick={handlePostClick}>
							POST
						</button>
					</div>
				</div>
			</div>

			<div className='submit-additional-info'>
				<h4>Posting to fakeddit</h4>
				<ul>
					<li>Remember that this is just a fake version.</li>
					<li>No, it is not perfect.</li>
					<li>I hope you enjoy using this though.</li>
				</ul>
			</div>
		</div>
	)

}

export default Submit