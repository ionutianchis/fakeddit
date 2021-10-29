import React from 'react'
import '../styles/About.css'

const About = () => {

    const handleClick = () => {
		window.open('https://github.com/Jonthejon10')
	}

    return (
		<div className='about-container'>
			<h3>About this project</h3>
			<p>
				I made this project as part of The Odin Project's curriculum,
				it's purpose is to replicate a popular website which we all know
				and love.
			</p>
			<div className='cake-container'>
				<span>Cake day:{' '}</span>
				<img src={require('../images/cake.png').default} alt='' />
				<span>29th of October 2021</span>
			</div>
			&nbsp;
			<div className='git-container'>
				<p>©Jonthejon10, 2021</p>
				<button className='git-button' onClick={handleClick} />
			</div>
		</div>
	)
}

export default About