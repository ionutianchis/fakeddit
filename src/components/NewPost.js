import React from 'react'
import {useHistory} from 'react-router-dom'
import '../styles/NewPost.css'

const NewPost = () => {
    const history = useHistory()
    return (
        <div className='new-post-container'>
            <img src={require('../images/avatar.png').default} alt=''/>
            <input placeholder='Create post' onClick={() => history.push('/fakeddit/submit')}></input>
        </div>
    )
}

export default NewPost