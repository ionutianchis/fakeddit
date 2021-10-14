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
			<p>Cake day</p>
			&nbsp;
			<div className='git-container'>
				<p>©Jonthejon10, 2021</p>
				<button className='git-button' onClick={handleClick} />
			</div>
		</div>
	)
}

export default About