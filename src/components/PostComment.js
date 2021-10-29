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
	isLoggedIn,
	loggedUser,
	comments,
}) => {

	const [upvoteDisable, setUpvoteDisable] = useState(false)
	const [downvoteDisable, setDownvoteDisable] = useState(false)

	const incrementLocalVote = () => {
		const incrementComment = comments.find(
			(x) => x.post === postTitle && x.text === text && x.date === date
		)
		incrementComment.upvotes = incrementComment.upvotes + 1
		const filteredArr = [
			...comments.filter(
				(x) =>
					x.post !== incrementComment.title &&
					x.text !== incrementComment.text &&
					x.data !== incrementComment.date
			),
		]
		setComments([...filteredArr, incrementComment])
	}

	const decrementLocalVote = () => {
		const decrementComment = comments.find(
			(x) => x.post === postTitle && x.text === text && x.date === date
		)
		decrementComment.upvotes = decrementComment.upvotes - 1
		const filteredArr = [
			...comments.filter(
				(x) =>
					x.post !== decrementComment.title &&
					x.text !== decrementComment.text &&
					x.data !== decrementComment.date
			),
		]
		setComments([...filteredArr, decrementComment])
	}

	const storeToLocal = (e, vote) => {
		let userHistory = JSON.parse(localStorage.getItem(loggedUser)) || []
		const obj = userHistory.find((x) => x.name === postTitle+ 'comment'+ [index])
		if (vote === 'upvote') {
			if (obj) {
				obj.upvote = true
				obj.downvote = false
				localStorage.setItem(loggedUser, JSON.stringify(userHistory))
			} else {
				userHistory.push({
					name: e.target.name +'comment' + [index],
					upvote: true,
					downvote: false,
				})
				localStorage.setItem(loggedUser, JSON.stringify(userHistory))
			}
		} else if (vote === 'downvote') {
			if (obj) {
				obj.downvote = true
				obj.upvote = false
				localStorage.setItem(loggedUser, JSON.stringify(userHistory))
			} else {
				userHistory.push({
					name: e.target.name + 'comment' + [index],
					downvote: true,
					upvote: false,
				})
				localStorage.setItem(loggedUser, JSON.stringify(userHistory))
			}
		}
	}

	const handleClick = (e) => {
		if (isLoggedIn === true) {
			if (e.target.classList.contains('arrow-button-up')) {
				storeToLocal(e, 'upvote')
				e.target.classList.add('arrow-button-up-active')
				e.target.nextSibling.nextSibling.classList.remove(
					'arrow-button-down-active'
				)
				incrementDbCommentVote(postTitle, date)
				incrementLocalVote()
			} else if (e.target.classList.contains('arrow-button-down')) {
				storeToLocal(e, 'downvote')
				e.target.classList.add('arrow-button-down-active')
				e.target.previousSibling.previousSibling.classList.remove(
					'arrow-button-up-active'
				)
				decrementDbCommentVote(postTitle, date)
				decrementLocalVote()
			}
		}
	}

	useEffect(() => {
		const userHistory = JSON.parse(localStorage.getItem(loggedUser)) || []

		const obj = userHistory.find((x) => x.name ===  postTitle + 'comment'+ [index])

		if (Object.keys(localStorage).includes(loggedUser)) {
			if (obj) {
				setUpvoteDisable(obj.upvote)
				setDownvoteDisable(obj.downvote)
			}
		} else {
			setUpvoteDisable(false)
			setDownvoteDisable(false)
		}
	}, [index, loggedUser, postTitle, upvotes])

	let upvoteButtonClass = upvoteDisable ? 'arrow-button-up-active' : ''
	let downvoteButtonClass = downvoteDisable ? 'arrow-button-down-active' : ''

	return (
		<div className='post-comment-container'>
			<div className='post-comment-top-div'>
				<h3>{author}</h3>

				{date.seconds && (
					<span>{formatDistance(date.toDate(), new Date())} ago</span>
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
						onClick={(e) => handleClick(e)}
						disabled={upvoteDisable}
						name={postTitle}
					/>
					<span>{upvotes}</span>

					<button
						type='button'
						className={`arrow-button arrow-button-down ${downvoteButtonClass}`}
						onClick={(e) => handleClick(e)}
						disabled={downvoteDisable}
						name={postTitle}
					/>
				</div>

				<div
					className='comment-reply-div'
					onClick={() =>
						alert(
							'Comment replies are not currently supported. Coming soon ™'
						)
					}>
					<img src={require('../images/reply.webp').default} alt='' />
					<span>Reply</span>
				</div>
			</div>
		</div>
	)
}

export default PostComment