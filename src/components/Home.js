import React from 'react'
import '../styles/Home.css'
import Post from './Post'

const Home = () => {

    const handleClick = () => {
        window.open("https://github.com/Jonthejon10")
    }

    return (
        <div className='home-container'>
            
            <div className='middle-container'>
                
                <div className='new-post-container'>
                    <img src={require('../images/avatar.png').default} alt=''/>
                    <input placeholder='Create post'></input>
                </div>

				<div className='category-chooser'>
                    <div className='button-div'>
                        <img src={require('../images/rocket.png').default} alt=''/>
                        <p>Best</p>
                    </div>

                    <div className='button-div'>
                        <img src={require('../images/hot.png').default} alt='' />
                        <p>Hot</p>
                    </div>

                    <div className='button-div'>
                        <img src={require('../images/new.png').default} alt='' />
                        <p>New</p>
			        </div>
                </div>

				<Post />
				<Post />
				<Post />
				<Post />
				<Post />
				<Post />
				<Post />
			</div>

			<div className='about-container'>
				<h3>About this project</h3>
				<p>
					I made this project as part of The Odin Project's
					curriculum, it's purpose is to replicate a popular website
					which we all know and love.
				</p>
				<p>Cake day</p>
				&nbsp;
				<div className='git-container'>
					<p>©Jonthejon10, 2021</p>
					<button className='git-button' onClick={handleClick} />
				</div>
			</div>
		</div>
	)
}

export default Home