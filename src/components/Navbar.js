import React, { useState } from 'react'
import { useHistory } from 'react-router-dom'
import AuthModal from './AuthModal'
import '../styles/Navbar.css'

const Navbar = ({ isLoggedIn, setIsLoggedIn }) => {

	const history = useHistory()

	const [modalOpen, setModalOpen] = useState(false)
	const [signInTime, setSignInTime] = useState(true)

	const handleSignInClick = () => {
		setModalOpen(!modalOpen)
		setSignInTime(true)
	}
	const handleSignUpClick = () => {
		setModalOpen(!modalOpen)
		setSignInTime(false)
	}

	return (
		<nav>
			<div className='logo-container'>
				<button type='button' className='logo-button' onClick={() => history.push('/fakeddit/')}/>
				<p>fakeddit</p>
			</div>

			<form className='nav-form'>
				<img
					src={require('../images/search.png').default}
					alt={'search'}
				/>
				<input
					className='nav-search'
					placeholder='Fake search Fakeddit'></input>
			</form>

			<div className='nav-buttons-container'>
			{!isLoggedIn &&
				<div className='nav-buttons'>
					<button
						type='button'
						className='nav-log-in'
						onClick={handleSignInClick}>
						Log In
					</button>
					<button
						type='button'
						className='nav-sign-up'
						onClick={handleSignUpClick}>
						Sign up
					</button>
				</div>
			}
			<button type='button' className='nav-user-icon' />
			</div>

			<AuthModal
				modalOpen={modalOpen}
				setModalOpen={setModalOpen}
				signInTime={signInTime}
				setSignInTime={setSignInTime}
				isLoggedIn={isLoggedIn}
				setIsLoggedIn={setIsLoggedIn}
			/>
		</nav>
	)
}

export default Navbar