import React from 'react'
import '../styles/Post.css'

const Post = () => {
    
    return (
		<div className='post-container'>
			<div className='arrow-buttons-div-container'></div>

			<div className='arrow-buttons-div'>
				<button
					type='button'
					className='arrow-button arrow-button-up'
				/>
				<button
					type='button'
					className='arrow-button arrow-button-down'
				/>
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

export default Post