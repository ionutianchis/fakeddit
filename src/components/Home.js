import React from 'react'
import '../styles/Home.css'
import Post from './Post'

const Home = () => {

    return (
        <div className='home-container'>
            <div className='middle-container'>
            <Post/>                
            <Post/>                
            <Post/>                
            <Post/>                
            <Post/>                
            <Post/>                
            <Post/>                
                
                
            </div>

            

            <div className='about-container'>
                <h3>About this project</h3>
                <p>I made this project as part of The Odin Project's curriculum, it's purpose is to replicate a popular website which we all know and love.</p>
                <p>Cake day</p>
                &nbsp;
                <div className='git-container'>
                    <p>©Jonthejon10, 2021</p>
                    <button className='git-button'/>
                </div>
            </div>
        </div>
    )
}

export default Home