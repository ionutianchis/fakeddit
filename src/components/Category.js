import React from 'react'
import { Link } from 'react-router-dom'
import '../styles/Category.css'

const Category = () => {

	return (
		<div className='category-chooser'>

				<Link to='/fakeddit/hot' className='styled-link'>
					<div className='button-div'>
						<img src={require('../images/hot.png').default} alt='' />
						<p>Hot</p>
					</div>
				</Link>

				<Link to='/fakeddit/' className='styled-link'>
					<div className='button-div'>
						<img src={require('../images/rocket.png').default} alt='' />
						<p>Best</p>
					</div>
				</Link>

				<Link to='/fakeddit/new/' className='styled-link'>
					<div className='button-div'>
						<img src={require('../images/new.png').default} alt='' />
						<p>New</p>
					</div>
				</Link>
		</div>
	)
}

export default Category