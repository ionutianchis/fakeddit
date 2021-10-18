import React  from 'react'
import '../styles/Home.css'
import NewPost from './NewPost'
import Category from './Category'
import PostPreview from './PostPreview'
import About from './About'

const Home = ({ isLoggedIn, storedPosts}) => {
	return (
		<div className='home-container'>
			<div className='middle-container'>
				{isLoggedIn && <NewPost />}
				<Category />
				{storedPosts.map((item, index) => {
					return (
						<PostPreview
							key={index}
							title={item.title}
							text={item.text}
							author={item.author}
							upvotes={item.upvotes}
							date={item.date}
							/>
						)
				})}
			</div>
			<About />
		</div>
	)
}

export default Home