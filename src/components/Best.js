import React from 'react'
import Category from './Category'
import NewPost from './NewPost'
import PostPreview from './PostPreview'
import About from './About'
import '../styles/Best.css'

const Best = ({
	isLoggedIn,
	storedPosts,
	setStoredPosts,
	comments,
}) => {

	return (
		<div className='middle-container'>
			<div className='best-container'>
				{isLoggedIn && <NewPost />}
				<Category />

				{storedPosts.map((item, index) => {
					return (
						<PostPreview
							key={index}
							isLoggedIn={isLoggedIn}
							storedPosts={storedPosts}
							setStoredPosts={setStoredPosts}
							title={item.title}
							text={item.text}
							author={item.author}
							upvotes={item.upvotes}
							date={item.date}
							index={index}
							imgUrl={item.imgUrl}
							url={item.url}
							comments={comments}
						/>
					)
				})}
			</div>
			<About />
		</div>
	)
}

export default Best