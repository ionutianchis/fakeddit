import React, { useEffect, useState } from 'react'
import '../styles/PostPreview.css'
import { incrementDbVote, decrementDbVote } from './Firebase'
import { useHistory } from 'react-router'
import { useDispatch } from 'react-redux'
import { formatDistance } from 'date-fns'
import { setIndex } from './redux/referencePost'


const PostPreview = ({
	title,
	text,
	imgUrl,
	url,
	author,
	date,
	upvotes,
	storedPosts,
	setStoredPosts,
	index,
	isLoggedIn,
	comments,
	loggedInUser,
}) => {

	const history = useHistory()

	const currPostComments = comments.filter((x) => x.post === title)

	const [upvoteDisable, setUpvoteDisable] = useState(false)
	const [downvoteDisable, setDownvoteDisable] = useState(false)

	const incrementLocalVote = () => {
		if (isLoggedIn === true) {
			storedPosts[index] = { ...storedPosts[index], upvotes: upvotes + 1 }
			setStoredPosts([...storedPosts])
		}
	}

	const decrementLocalVote = () => {
		if (isLoggedIn === true) {
			storedPosts[index] = { ...storedPosts[index], upvotes: upvotes - 1 }
			setStoredPosts([...storedPosts])
		}
	}

	const storeToLocal = (e, vote) => {
		// storing user upvotes and upvote visuals in localstorage
		let userHistory = JSON.parse(localStorage.getItem(loggedInUser)) || []
		const obj = userHistory.find((x) => x.name === title)
		if (vote === 'upvote') {
			if (obj) {
				obj.upvote = true
				obj.downvote = false
				localStorage.setItem(loggedInUser, JSON.stringify(userHistory))
			} else {
				userHistory.push({
					name : e.target.name,
					upvote: true,
					downvote: false,
				})
				localStorage.setItem(loggedInUser, JSON.stringify(userHistory))
			}
		} else if (vote === 'downvote') {
			if (obj) {
				obj.downvote = true
				obj.upvote = false
				localStorage.setItem(loggedInUser, JSON.stringify(userHistory))

			} else {
				userHistory.push({
					name: e.target.name,
					downvote: true,
					upvote: false,
				})
				localStorage.setItem(loggedInUser, JSON.stringify(userHistory))
			}
		}
	}

	const handleClick = (e) => {
		if (isLoggedIn === true) {
			if (e.target.classList.contains('arrow-button-up')) {
				storeToLocal(e, 'upvote')
				//button visuals
				e.target.classList.add('arrow-button-up-active')
				e.target.nextSibling.nextSibling.classList.remove(
					'arrow-button-down-active'
				)
				incrementDbVote(e)
				incrementLocalVote(e)
			} else if (e.target.classList.contains('arrow-button-down')) {
				storeToLocal(e, 'downvote')
				e.target.classList.add('arrow-button-down-active')
				e.target.previousSibling.previousSibling.classList.remove(
					'arrow-button-up-active'
				)
				decrementDbVote(e)
				decrementLocalVote()
			}
		}
	}

	useEffect(() => {
		// change vote ability after login
		setUpvoteDisable(!isLoggedIn)
		setDownvoteDisable(!isLoggedIn)
	}, [isLoggedIn])

	useEffect(() => {
		// retrieving stored user upvotes and visuals stored in localstorage
		const userHistory = JSON.parse(localStorage.getItem(loggedInUser)) || []
		
		const obj = (userHistory.find(x => x.name === title))

		if (Object.keys(localStorage).includes(loggedInUser)) {
			if (obj) {
				setUpvoteDisable(obj.upvote)
				setDownvoteDisable(obj.downvote) 
			}
		} else {
			setUpvoteDisable(false)
			setDownvoteDisable(false)
		}
	}, [loggedInUser, title, upvotes])

	const getFirstPart = (str) => {
		// only showing first part of links in previews
		const sliceStr = str.slice(8)
		return sliceStr.split('/')[0]
	}

	const dispatch = useDispatch()

	const handlePostOpen = () => {
		// using redux toolkit to store post's index when opening the full post
		history.push(`/fakeddit/${index}`)
		dispatch(setIndex(index))
	}
	
	// dynamic vote visuals
	let upvoteButtonClass = upvoteDisable ? 'arrow-button-up-active' : ''
	let downvoteButtonClass = downvoteDisable ? 'arrow-button-down-active' : ''

	return (
		<div className='post-container'>
			<div className='arrow-buttons-div-container'>
				<div className='arrow-buttons-div'>
					<button
						type='button'
						className={`arrow-button arrow-button-up ${upvoteButtonClass}`}
						name={title}
						onClick={(e) => handleClick(e)}
						disabled={upvoteDisable}
					/>

					<span>{upvotes}</span>

					<button
						type='button'
						className={`arrow-button arrow-button-down ${downvoteButtonClass}`}
						name={title}
						onClick={(e) => handleClick(e)}
						disabled={downvoteDisable}
					/>
				</div>
			</div>
			<div className='post-content-container' onClick={handlePostOpen}>
				<div className='post-top-container'>
					<p>Posted by u/{author}</p>
					<p>{formatDistance(date, new Date())} ago</p>
				</div>

				<div className='post-middle-container'>
					<h3>{title}</h3>

					{imgUrl && (
						<div className='post-img-container'>
							<img src={imgUrl} alt='Invalid URL' />
						</div>
					)}

					{url && (
						<div className='url-container'>
							<div className='anchor-tag-container'>
								<a href={url}>{getFirstPart(url) + '/'}</a>
								<span>...</span>
								<img
									src={
										require('../images/redirect.png')
											.default
									}
									alt=''
								/>
							</div>

							<div className='link-image'>
								<img
									src={
										require('../images/link-preview.png')
											.default
									}
									alt=''
									onClick={() => window.open(url)}
								/>

								<img
									src={
										require('../images/redirect.png')
											.default
									}
									alt=''
								/>
							</div>
						</div>
					)}

					<p>{text}</p>
				</div>

				<div className='post-footer-container'>
					<div className='bottom-icons-div'>
						<img
							src={require('../images/comments.webp').default}
							alt=''
						/>
						<p>{currPostComments.length} Comments</p>
					</div>

					<div className='bottom-icons-div'>
						<img
							src={require('../images/award.webp').default}
							alt=''
						/>
						<p>Award</p>
					</div>

					<div className='bottom-icons-div'>
						<img
							src={require('../images/share.webp').default}
							alt=''
						/>
						<p>Share</p>
					</div>

					<div className='save-container'></div>
				</div>
			</div>
		</div>
	)
}

export default PostPreview