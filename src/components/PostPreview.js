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
}) => {

	const history = useHistory()

	const currPostComments = comments.filter(x => x.post === title)

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

	const handleClick = (e) => {
		if (isLoggedIn === true) {
			if (e.target.classList.contains('arrow-button-up')) {
				localStorage.setItem(e.target.name + ' upvote', true)
				localStorage.setItem(e.target.name + ' downvote', false)
				e.target.classList.add('arrow-button-up-active')
				e.target.nextSibling.nextSibling.classList.remove(
					'arrow-button-down-active'
				)
				incrementDbVote(e)
				incrementLocalVote(e)
			} else if (e.target.classList.contains('arrow-button-down')) {
				localStorage.setItem(e.target.name + ' downvote',true)
				localStorage.setItem(e.target.name + ' upvote', false)
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
		setUpvoteDisable(!isLoggedIn)
		setDownvoteDisable(!isLoggedIn)			// change vote ability after login
	}, [isLoggedIn])

	useEffect(() => {
		setUpvoteDisable(
			JSON.parse(
				localStorage.getItem(
					title + ' upvote'
				)
			)
		)
		setDownvoteDisable(
			JSON.parse(
				localStorage.getItem(
					title + ' downvote'
				)
			)
		)
	// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [upvotes])
	
	const getFirstPart = (str) => {
		const sliceStr = str.slice(8)
		return sliceStr.split('/')[0]
	}
	
	const dispatch = useDispatch()
	
	const handlePostOpen = () => {
		history.push(`/fakeddit/${index}`)
		dispatch(setIndex(index))		
	}

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