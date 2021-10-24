import React, { useEffect, useState } from 'react'
import '../styles/PostPreview.css'
import { incrementDbVote, decrementDbVote } from './Firebase'

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
}) => {
	
	const [upvoteDisable, setUpvoteDisable] = useState(false)
	const [downvoteDisable, setDownvoteDisable] = useState(false)
	
	const incrementLocalVote = () => {
		storedPosts[index] = { ...storedPosts[index], upvotes: upvotes + 1 }
		setStoredPosts([...storedPosts])
	}
	// ADD PERSISTENT VISUALS
	const decrementLocalVote = () => {
		storedPosts[index] = { ...storedPosts[index], upvotes: upvotes - 1 }
		setStoredPosts([...storedPosts])
	}

	const handleClick = (e) => {
		if (e.target.classList.contains('arrow-button-up')) {
			e.target.classList.add('arrow-button-up-active')
			e.target.nextSibling.nextSibling.classList.remove(
				'arrow-button-down-active'
			)
			setUpvoteDisable(true)
			setDownvoteDisable(false)
			incrementDbVote(e)
			incrementLocalVote(e)
		} else if (e.target.classList.contains('arrow-button-down')) {
			e.target.classList.add('arrow-button-down-active')
			e.target.previousSibling.previousSibling.classList.remove(
				'arrow-button-up-active'
			)
			setDownvoteDisable(true)
			setUpvoteDisable(false)
			decrementDbVote(e)
			decrementLocalVote()
		}
	}

	useEffect(() => {
		setUpvoteDisable(!isLoggedIn)
		setDownvoteDisable(!isLoggedIn)			// change vote ability after login
	}, [isLoggedIn])

	const getFirstPart = (str) => {
		const sliceStr = str.slice(8)
		return sliceStr.split('/')[0]
	}

	console.log(getFirstPart('https://test.com/eetststsd'))

	return (
		<div className='post-container'>
			<div className='arrow-buttons-div-container'>
				<div className='arrow-buttons-div'>
					<button
						type='button'
						className='arrow-button arrow-button-up'
						name={title}
						onClick={(e) => handleClick(e)}
						disabled={upvoteDisable}
					/>

					<span>{upvotes}</span>

					<button
						type='button'
						className='arrow-button arrow-button-down'
						name={title}
						onClick={(e) => handleClick(e)}
						disabled={downvoteDisable}
					/>
				</div>
			</div>

			<div className='post-top-container'>
				<p>Posted by u/{author}</p>
				<p>{date} ago</p>
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
								src={require('../images/redirect.png').default}
								alt=''
							/>
						</div>

						<div className='link-image'>
							<img src={require('../images/link-preview.png').default}
								alt=''
								onClick={() => window.open(url)}
							/>
							
							<img
								src={require('../images/redirect.png').default}
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
					<p>Comments</p>
				</div>

				<div className='bottom-icons-div'>
					<img src={require('../images/award.webp').default} alt='' />
					<p>Award</p>
				</div>

				<div className='bottom-icons-div'>
					<img src={require('../images/share.webp').default} alt='' />
					<p>Share</p>
				</div>

				<div className='save-container'></div>
			</div>
		</div>
	)
}

export default PostPreview