import React, { useEffect } from 'react'
import formatDistance from 'date-fns/formatDistance'
import '../styles/PostComment.css'

const PostComment = ({ author, text, upvotes, date }) => {
/*     let formattedDate
    if(date.seconds) formattedDate = date.toDate()
     */
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
						className='arrow-button arrow-button-up'
					/>
					<span>{upvotes}</span>

					<button
						type='button'
						className='arrow-button arrow-button-down'
					/>
				</div>

				<div className='comment-reply-div'>
					<img src={require('../images/reply.webp').default} alt='' />
					<span>Reply</span>
				</div>
			</div>
		</div>
	)
}

export default PostComment