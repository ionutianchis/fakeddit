import React  from 'react'
import '../styles/Home.css'
import NewPost from './NewPost'
import Category from './Category'
import Post from './PostPreview'
import About from './About'

const Home = ({ isLoggedIn, storedPosts}) => {
	return (
		<div className='home-container'>
			<div className='middle-container'>
				
				{isLoggedIn &&
					<NewPost />
				}
				<Category />
				<Post storedPosts={storedPosts}/>
			</div>
			<About />
		</div>
	)
}

export default Home