import React from 'react'
import '../styles/Home.css'
import NewPost from './NewPost'
import Category from './Category'
import Post from './Post'
import About from './About'
const Home = () => {

    return (
        <div className='home-container'>
            
            <div className='middle-container'>
                <NewPost/>
				<Category/>
				<Post />
				<Post />
				<Post />
				<Post />
				<Post />
				<Post />
				<Post />
			</div>
			<About/>
		</div>
	)
}

export default Home