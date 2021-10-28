import React, { useEffect, useState } from "react"
import { useSelector } from "react-redux"
import '../styles/FullPost.css'
import formatDistance from "date-fns/formatDistance"
import About from "./About"
import PostComment from "./PostComment"
import { storePostComment } from "./Firebase"
import { incrementDbVote, decrementDbVote } from './Firebase'

const FullPost = ({
	isLoggedIn,
	storedPosts,
	setStoredPosts,
	comments,
	setComments,
	loggedUser,
}) => {
	const { post } = useSelector((state) => state.post)
	const currPost = storedPosts[post]

	const currPostComments = comments.filter((x) => x.post === currPost.title)
	const [upvoteDisable, setUpvoteDisable] = useState(false)

	const [downvoteDisable, setDownvoteDisable] = useState(false)

	const [input, setInput] = useState('')

	const [commentContent, setCommentContent] = useState({})
	const [commentEmpty, setCommentEmpty] = useState(true)

	const incrementLocalVote = () => {
		storedPosts[post] = {
			...storedPosts[post],
			upvotes: currPost.upvotes + 1,
		}
		setStoredPosts([...storedPosts])
	}

	const decrementLocalVote = () => {
		storedPosts[post] = {
			...storedPosts[post],
			upvotes: currPost.upvotes - 1,
		}
		setStoredPosts([...storedPosts])
	}

	const handleClick = (e) => {
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
			localStorage.setItem(e.target.name + ' downvote', true)
			localStorage.setItem(e.target.name + ' upvote', false)
			e.target.classList.add('arrow-button-down-active')
			e.target.previousSibling.previousSibling.classList.remove(
				'arrow-button-up-active'
			)
			decrementDbVote(e)
			decrementLocalVote()
		}
	}

	useEffect(() => {
		if (input.length > 0) setCommentEmpty(false)
	}, [input])

	const handleCommentSubmit = () => {
		if (isLoggedIn === true) {
			setComments([
				...comments,
				{
					post: currPost.title,
					text: input,
					author: loggedUser,
					date: new Date(),
					upvotes: 0,
				},
			])
			setCommentContent({
				...commentContent,
				text: input,
				author: loggedUser,
				date: new Date(),
				upvotes: 0,
			})
			setInput('')
		} else {
			alert('You must be logged in to comment !')
		}
	}

	useEffect(() => {
		if (commentContent.author) {
			storePostComment(
				currPost.title,
				commentContent.author,
				commentContent.text,
				commentContent.date,
				commentContent.upvotes
			)
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [commentContent])

	useEffect(() => {
		if (isLoggedIn === true && currPost) {
			setUpvoteDisable(
				JSON.parse(localStorage.getItem(currPost.title + ' upvote'))
			)
			setDownvoteDisable(
				JSON.parse(localStorage.getItem(currPost.title + ' downvote'))
			)
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [currPost])

	let upvoteButtonClass = upvoteDisable ? 'arrow-button-up-active' : ''
	let downvoteButtonClass = downvoteDisable ? 'arrow-button-down-active' : ''

	return (
		<div className='fullpost-container'>
			{currPost && (
				<div className='fullpost-middle-container'>
					<div className='fullpost-content'>
						<div className='fullpost-arrow-buttons-container'>
							<button
								type='button'
								className={`arrow-button arrow-button-up ${upvoteButtonClass}`}
								disabled={upvoteDisable}
								name={currPost.title}
								onClick={(e) => handleClick(e)}
							/>

							<span>{currPost.upvotes}</span>

							<button
								type='button'
								className={`arrow-button arrow-button-down ${downvoteButtonClass}`}
								disabled={downvoteDisable}
								name={currPost.title}
								onClick={(e) => handleClick(e)}
							/>
						</div>

						<p>
							Posted by u/{currPost.author} {''}
							<span>
								{formatDistance(currPost.date, new Date())} ago
							</span>
						</p>

						<div className='fullpost-middle-content'>
							<h2>{currPost.title}</h2>

							<span>{currPost.text}</span>

							{currPost.imgUrl && (
								<img
									src={currPost.imgUrl}
									alt='Img could not load properly.'
								/>
							)}

							{currPost.url && (
								<div className='fullpost-url-container'>
									<div className='fullpost-anchor-tag-container'>
										<a href={currPost.url}>
											{currPost.url}
										</a>
										<img
											src={
												require('../images/redirect.png')
													.default
											}
											alt=''
										/>
									</div>

									<div className='fullpost-link-image'>
										<img
											src={
												require('../images/link-preview.png')
													.default
											}
											alt=''
											onClick={() =>
												window.open(currPost.url)
											}
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

							<span>Comment as {currPost.author}</span>

							<div className='fullpost-input-container'>
								<textarea
									name='text'
									rows='9'
									placeholder='What are your thoughts ?'
									value={input}
									onChange={(e) => setInput(e.target.value)}
								/>

								<button
									type='button'
									className='submit-comment'
									disabled={commentEmpty}
									onClick={handleCommentSubmit}>
									Comment
								</button>
							</div>
						</div>

						<div className='fullPost-footer-container'>
							<div className='fullPost-icons-div'>
								<img
									src={
										require('../images/comments.webp')
											.default
									}
									alt=''
								/>
								<span>{currPostComments.length} Comments</span>
							</div>

							<div className='fullPost-icons-div'>
								<img
									src={
										require('../images/award.webp').default
									}
									alt=''
								/>
								<span>Award</span>
							</div>

							<div className='fullPost-icons-div'>
								<img
									src={
										require('../images/share.webp').default
									}
									alt=''
								/>
								<span>Share</span>
							</div>
						</div>
					</div>
					{currPostComments.map((item, index) => {
						return (
							<PostComment
								key={index}
								currPostComments={currPostComments}
								setComments={setComments}
								index={index}
								postTitle={currPost.title}
								author={item.author}
								text={item.text}
								date={item.date}
								upvotes={item.upvotes}
								isLoggedIn={isLoggedIn}
							/>
						)
					})}
				</div>
			)}

			<About />
		</div>
	)
}

export default FullPost