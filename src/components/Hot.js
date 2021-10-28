import React  from 'react'
import '../styles/Hot.css'
import NewPost from './NewPost'
import Category from './Category'
import PostPreview from './PostPreview'

const Hot = ({
	isLoggedIn,
	storedPosts,
	setStoredPosts,
	comments,
}) => {
	const hotPosts = storedPosts.sort((a, b) => b.upvotes - a.upvotes)

	return (
		<div className='hot-container'>
			{isLoggedIn && <NewPost />}
			<Category />

			{hotPosts.map((item, index) => {
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
	)
}

export default Hot