import React, { useEffect } from 'react'
import Category from './Category'
import NewPost from './NewPost'
import PostPreview from './PostPreview'
import '../styles/New.css'
import format from 'date-fns/format'
const New = ({ isLoggedIn, storedPosts, setStoredPosts }) => {

    const NewPosts = storedPosts.sort((a, b) => b.date - a.date)

	return (
			<div className='new-container'>
				{isLoggedIn && <NewPost />}
				<Category />

				{NewPosts.map((item, index) => {
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
							comments={item.comments}
						/>
					)
				})}
			</div>
	)
}

export default New
