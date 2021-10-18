import React from 'react'
import '../styles/PostPreview.css'
const PostPreview = ({title, text, author, date, upvotes}) => {
	
    return (
		<div className='post-container'>
			
			<div className='arrow-buttons-div-container'>
				<div className='arrow-buttons-div'>
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
			</div>

			<div className='post-top-container'>
				<p>Posted by u/{author}</p>
				<p>{date} ago</p>

			</div>

			<div className='post-middle-container'>
				<h3>{title}</h3>
				<p>{text}</p>
			</div>

            <div className='post-footer-container'>
				<div className='bottom-icons-div'>
					<img src={require('../images/comments.webp').default} alt=''/>
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