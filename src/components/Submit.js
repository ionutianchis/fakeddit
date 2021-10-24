import React, { useState } from 'react'
import { useHistory } from 'react-router'
import '../styles/Submit.css'
import { Timestamp } from '@firebase/firestore'
import { storeImgPost, storeLinkPost, storePost } from './Firebase'
import { formatDistance } from 'date-fns'

const Submit = ({loggedInUser, isLoggedIn, storedPosts, setStoredPosts}) => {
	
	const history = useHistory()

	const [postContent, setPostContent] = useState({
		author: loggedInUser,
		upvotes: 0,
	})	

	const [error, setError] = useState('')
	const [formSubmitted, setFormSubmitted] = useState(false)

	const [textPost, setTextPost] = useState(true)
	const [imgPost, setImgPost] = useState(false)
	const [urlPost, setUrlPost] = useState(false)
	
	const handleChange = (e) => {

		setPostContent({
			...postContent,
			[e.target.name]: e.target.value,

		})
	}

	const handleContentChange = (e) => {
		setPostContent({
			...postContent,
			[e.target.name]: e.target.value
		})
	}

	const postValidation = () => {
		if (textPost === true) {
			if (postContent.title === undefined) {
				setError('Title cannot be empty.')
			} else if (postContent.text === undefined) {
				setError('Text cannot be empty.')
			} else {
				setFormSubmitted(true)
				return true
			}
		} else if (imgPost === true) {
			if (postContent.title === undefined) {
				setError('Title cannot be empty.')
			} else if (postContent.imgUrl === undefined) {
				setError('Image URL cannot be empty.')
			} else if (
				!postContent.imgUrl.includes('https://') ||
				!postContent.imgUrl.includes('.com')
			) {
				setError('Invalid image URL.')
			} else {
				setFormSubmitted(true)
				return true
			}
		} else if (urlPost === true) {
			if (postContent.title === undefined) {
				setError('Title cannot be empty.')
			} else if (postContent.url === undefined) {
				setError('URL cannot be empty.')
			} else if (
				!postContent.url.includes('https://') ||
				!postContent.url.includes('.com')
			) {
				setError('Invalid URL.')
			} else {
				setFormSubmitted(true)
				return true
			}
		}
	}
	
	const handlePostClick = () => {
		if (isLoggedIn === true && postValidation() === true) {
			setPostContent({
				...postContent,
				author: loggedInUser,
				date: new Date(),
			})
			if (textPost === true) {
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
					}
				])
			} else if (imgPost === true) {
				storeImgPost(
					postContent.title,
					postContent.imgUrl,
					postContent.author,
					postContent.upvotes,
					Timestamp.fromDate(new Date())
				)
				setStoredPosts((prevState) => [
					...prevState,
					{
						title: postContent.title,
						imgUrl: postContent.imgUrl,
						author: postContent.author,
						upvotes: postContent.upvotes,
						date: formatDistance(new Date(), new Date()),
					},
				])
			} else if (urlPost === true) {
				storeLinkPost(
					postContent.title,
					postContent.url,
					postContent.author,
					postContent.upvotes,
					Timestamp.fromDate(new Date())
				)
				setStoredPosts((prevState) => [
					...prevState,
					{
						title: postContent.title,
						url: postContent.url,
						author: postContent.author,
						upvotes: postContent.upvotes,
						date: formatDistance(new Date(), new Date()),
					},
				])
			}
			history.push('/fakeddit/')
		} else if (!isLoggedIn) {
			setError('You must be logged in to post !')
		}
	}

	const changePostType = (e) => {
		setPostContent({
			author: loggedInUser,
			upvotes: 0,
		})
 		e.target.classList.add('selector-button-active')
		if (e.target.name === 'text') {
			e.target.nextSibling.classList.remove('selector-button-active')
			e.target.nextSibling.nextSibling.classList.remove('selector-button-active')
			setTextPost(true)
			setImgPost(false)
			setUrlPost(false)
		}
		if (e.target.name === 'img') {
 			e.target.previousSibling.classList.remove('selector-button-active')
 			e.target.nextSibling.classList.remove('selector-button-active')
			setImgPost(true)
			setTextPost(false)
			setUrlPost(false)
		}
		if (e.target.name === 'url') {
 			e.target.previousSibling.classList.remove('selector-button-active')
 			e.target.previousSibling.previousSibling.classList.remove('selector-button-active')
			setUrlPost(true)
			setTextPost(false)
			setImgPost(false)
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
							className='selector-button post-button selector-button-active'
							name='text'
							onClick={(e) => changePostType(e)}>
							Post
						</button>
						<button
							type='button'
							className='selector-button image-button'
							name='img'
							onClick={(e) => changePostType(e)}>
							Image
						</button>
						<button
							type='button'
							className='selector-button url-button'
							name='url'
							onClick={(e) => changePostType(e)}>
							URL
						</button>
					</div>

					<input
						type='text'
						name='title'
						placeholder='Title'
						onChange={(e) => handleChange(e)}
					/>

					{textPost && (
						<textarea
							name='text'
							rows='5'
							cols='85'
							placeholder='Text'
							onChange={(e) => handleChange(e)}
						/>
					)}

					{imgPost && (
						<textarea
							name='imgUrl'
							rows='2'
							cols='85'
							placeholder='Image URL'
							onChange={(e) => handleContentChange(e)}
						/>
					)}

					{urlPost && (
						<textarea
							name='url'
							rows='2'
							cols='85'
							placeholder='Url'
							onChange={(e) => handleContentChange(e)}
						/>
					)}

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
						<button
							type='button'
							className='cancel-submit-button'
							onClick={() => history.push('/fakeddit/')}>
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