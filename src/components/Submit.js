import React from 'react'
import '../styles/Submit.css'
const Submit = () => {

    return (
        <div className='submit-container'>
            
			<div className='submit-new-post-container'>
				<div className='submit-header'>
					<h4>Create a post</h4>
				</div>

                <div className='submit-new-post'>
                    
					<div className='submit-selector'>
						<button type='button' className='selector-button post-button'>
							Post
						</button>
						<button type='button' className='selector-button image-button'>
							Image
						</button>
						<button type='button' className='selector-button url-button'>
							URL
						</button>
                    </div>
                    
					<input type='text' name='post-title' placeholder='Title' />
					
                    <textarea
						name='post-text'
						rows='5'
						cols='85'
						placeholder='Text'/>
                    
                    <div className='submit-buttons-div'>
                        <button type='button' className='cancel-submit-button'>CANCEL</button>
                        <button type='button' className='add-submit-button'>POST</button>
                    </div>
                </div>
                
			</div>

			<div className='submit-additional-info'>
                <h4>Posting to fakeddit</h4>
                <ul>
                    <li>Remember that this is just a fake version.</li>
                    <li>No, it is not perfect.</li>
                    <li>I hope you enjoy using this though.</li>
                </ul>
			</div>
		</div>
	)

}

export default Submit