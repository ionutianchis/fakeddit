import React from 'react'
import '../styles/NewPost.css'
const NewPost = () => {

    return (
        <div className='new-post-container'>
            <img src={require('../images/avatar.png').default} alt=''/>
            <input placeholder='Create post'></input>
        </div>
    )
}

export default NewPost