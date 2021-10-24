import React  from 'react'
import '../styles/Home.css'
import NewPost from './NewPost'
import Category from './Category'
import PostPreview from './PostPreview'
import About from './About'

const Home = ({ isLoggedIn, storedPosts, setStoredPosts }) => {
	
	return (
		<div className='home-container'>

			<div className='middle-container'>
			
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
							/>
						)
				})}
			</div>
			<About />
		</div>
	)
}

export default Home