import React, { useEffect, useState } from 'react'
import formatDistance from 'date-fns/formatDistance'
import { decrementDbCommentVote, incrementDbCommentVote } from './Firebase'
import '../styles/PostComment.css'

const PostComment = ({
	author,
	text,
	upvotes,
	date,
	index,
	postTitle,
	currPostComments,
	setComments,
	isLoggedIn
}) => {

	const [upvoteDisable, setUpvoteDisable] = useState(false)
	const [downvoteDisable, setDownvoteDisable] = useState(false)
		
	const incrementLocalVote = () => {
		currPostComments[index] = {
			...currPostComments[index],
			upvotes: currPostComments[index].upvotes + 1,
		}
		setComments([...currPostComments])
	}

	const decrementLocalVote = () => {
		currPostComments[index] = {
			...currPostComments[index],
			upvotes: currPostComments[index].upvotes - 1,
		}
		setComments([...currPostComments])
	}

	const handleUpvote = (e) => {
		if (isLoggedIn === true) {
			incrementLocalVote()
			 incrementDbCommentVote(postTitle, date)
			 localStorage.setItem(
				e.target.name + ' comment' + [index] + ' upvote',
				true
			)
			
			 localStorage.setItem(
				e.target.name + ' comment' + [index] + ' downvote',
				false
			)
		}
	}

	const handleDownvote = (e) => {
		if (isLoggedIn === true) {
			decrementLocalVote()
			decrementDbCommentVote(postTitle, date)
			localStorage.setItem(
				e.target.name + ' comment' + [index] + ' downvote',
				true
			)
	
			localStorage.setItem(
				e.target.name + ' comment' + [index] + ' upvote',
				false
			)
		}
	}

	useEffect(() => {
		setUpvoteDisable(
			JSON.parse(
				localStorage.getItem(
					postTitle + ' comment' + [index] + ' upvote'
				)
			)
		)

		setDownvoteDisable(
			JSON.parse(
				localStorage.getItem(
					postTitle + ' comment' + [index] + ' downvote'
				)
			)
		)
	// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [upvotes])

    let upvoteButtonClass = upvoteDisable ? 'arrow-button-up-active' : ''
	let downvoteButtonClass = downvoteDisable ? 'arrow-button-down-active' : ''

		return (
			<div className='post-comment-container'>
				<div className='post-comment-top-div'>
					<h3>{author}</h3>

					{date.seconds && (
						<span>
							{formatDistance(date.toDate(), new Date())} ago
						</span>
					)}
					{!date.seconds && (
						<span>{formatDistance(date, new Date())} ago</span>
					)}
				</div>

				<div className='post-comment-middle-div'>
					<span>{text}</span>
				</div>

				<div className='post-comment-bottom-div'>
					<div className='comment-arrows-container'>
						<button
							type='button'
							className={`arrow-button arrow-button-up ${upvoteButtonClass}`}
							onClick={(e) => handleUpvote(e)}
							disabled={upvoteDisable}
							name={postTitle}
						/>
						<span>{upvotes}</span>

						<button
							type='button'
							className={`arrow-button arrow-button-down ${downvoteButtonClass}`}
							onClick={(e) => handleDownvote(e)}
							disabled={downvoteDisable}
							name={postTitle}
						/>
					</div>

					<div className='comment-reply-div' onClick={() => alert('Comment replies are not currently supported. Coming soon ™')}>
						<img
							src={require('../images/reply.webp').default}
							alt=''
						/>
						<span>Reply</span>
					</div>
				</div>
			</div>
		)
}

export default PostComment