import React from 'react'
import Category from './Category'
import NewPost from './NewPost'
import '../styles/Best.css'

const Best = ({isLoggedIn}) => {
    return (
        <div className='best-container'>
            {isLoggedIn &&
                <NewPost />
            }
            <Category />
        </div>
    )
}

export default Best