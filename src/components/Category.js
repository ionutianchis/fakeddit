import React from 'react'
import '../styles/Category.css'

const Category = () => {

    return (
		<div className='category-chooser'>
			<div className='button-div'>
				<img src={require('../images/rocket.png').default} alt='' />
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
	)
}

export default Category