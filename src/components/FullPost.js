import React from "react"
import { useSelector } from "react-redux"
import '../styles/FullPost.css'
import formatDistance from "date-fns/formatDistance"
import About from "./About"

const FullPost = ({ storedPosts }) => {

    const { post } = useSelector((state) => state.post)
    const currPost = storedPosts[post]
    
	return (
		<div className='fullpost-container'>
            <div className='fullpost-middle-container'>
                
				{currPost && (
					<div className='fullpost-content'>
						<div className='fullpost-arrow-buttons-container'>
							<button
								type='button'
								className='arrow-button arrow-button-up'
							/>

							<span>{currPost.upvotes}</span>

							<button
								type='button'
								className='arrow-button arrow-button-down'
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
                            
                            {
                                currPost.imgUrl &&
                                <img src={currPost.imgUrl} alt='Img could not load properly.' />
                            }
                            
                            {
                                currPost.url &&
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
                            }

							<span>Comment as {currPost.author}</span>

							<div className='fullpost-input-container'>
								<textarea
									name='text'
									rows='9'
									placeholder='What are your thoughts ?'
								/>

								<button
									type='button'
									className='submit-comment'>
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
								<span>{currPost.comments} Comments</span>
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

							<div className='save-container'></div>
						</div>
					</div>
				)}
            </div>
            <About/>
		</div>
	)
}

export default FullPost