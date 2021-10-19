import React, { useState } from 'react'
import Modal from 'react-modal'
import '../styles/AuthModal.css'
import { addUser, loginUser } from './Firebase'
Modal.setAppElement('#root')

const AuthModal = ({
	modalOpen,
	setModalOpen,
	signInTime,
	setSignInTime,
	isLoggedIn,
	setIsLoggedIn,
}) => {
	const [signUpCredentials, setSignUpCredentials] = useState({
		name: '',
		email: '',
		pass: '',
	})

	const [logInCredentials, setLogInCredentials] = useState({
		userEmail: '',
		userPass: '',
	})

	const [error, setError] = useState('')
	const [loginError, setLoginError] = useState('')

	const [formSubmitted, setFormSubmitted] = useState(false)

	const setSignUp = (e, field) => {
		setSignUpCredentials((prevState) => ({
			...prevState,
			[field]: e.target.value,
		}))
	}

	const setLogIn = (e, field) => {
		setLogInCredentials((prevState) => ({
			...prevState,
			[field]: e.target.value,
		}))
	}

	const formValidation = () => {
		if (
			signUpCredentials.name.length < 1 ||
			signUpCredentials.email.length < 1 ||
			signUpCredentials.pass.length < 1
		) {
			setError('Field/s cannot be empty!')
		} else if (
			!signUpCredentials.email.includes('@') ||
			!signUpCredentials.email.includes('.com')
		) {
			setError('Email is incorrect.')
		} else if (signUpCredentials.pass.length < 4) {
			setError('Password is too short, minimum 4 characters.')
		} else {
			setFormSubmitted(true)
			addUser(signUpCredentials.email, signUpCredentials.pass)
			setSignInTime(true)
		}
	}

	const clearForm = () => {
		setSignUpCredentials({
			name: '',
			email: '',
			pass: '',
		})
	}

	const handleSubmit = () => {
		formValidation()
		clearForm()
	}

	const loginValidation = () => {
		if (
			logInCredentials.userEmail.length < 1 ||
			logInCredentials.userPass < 1
		) {
			setLoginError('Field/s cannot be empty!')
		}
	}

	const handleLogIn = async () => {
		const tryLogin = await loginUser(
			logInCredentials.userEmail,
			logInCredentials.userPass
		)
		if (tryLogin === true) {
			setModalOpen(!modalOpen)
			setIsLoggedIn(true)
		} else if (tryLogin === 'Firebase: Error (auth/invalid-email).') {
			setLoginError('Invalid email.')
		} else if (tryLogin === 'Firebase: Error (auth/user-not-found).') {
			setLoginError('Email not found.')
		} else if (tryLogin === 'Firebase: Error (auth/wrong-password).') {
			setLoginError('Wrong password.')
		}
		loginValidation()
	}

	return (
		<Modal
			isOpen={modalOpen}
			onRequestClose={() => setModalOpen(!modalOpen)}
			className='modal'
			overlayClassName='modal-overlay'>
			<div className='img-container' />

			<div className='text-container'>
				{signInTime && <h4>Login</h4>}

				{!signInTime && <h4>Sign up </h4>}

				<p>By continuing, you agree that you are fakeusing fakeddit.</p>

				{signInTime && (
					<form className='auth-form login-form'>
						<input
							type='text'
							placeholder='EMAIL'
							name='userEmail'
							value={logInCredentials.userEmail}
							onChange={(e) => setLogIn(e, e.target.name)}
						/>

						<input
							type='password'
							placeholder='PASSWORD'
							name='userPass'
							value={logInCredentials.userPass}
							onChange={(e) => setLogIn(e, e.target.name)}
						/>
						{!isLoggedIn && (
							<p
								style={{
									color: '#ea0027',
									marginLeft: -115,
									marginBottom: -10,
									marginTop: 10,
									fontSize: 12,
								}}>
								{loginError}
							</p>
						)}
						<button
							type='button'
							className='form-button'
							onClick={handleLogIn}>
							Log In
						</button>

						<p style={{ marginLeft: -41, marginTop: 10 }}>
							Don't have an account yet ?&nbsp;
							<span onClick={() => setSignInTime(!signInTime)}>
								SIGN UP
							</span>
						</p>
					</form>
				)}

				{!signInTime && (
					<form className='auth-form sign-up-form'>
						<input
							type='text'
							name='name'
							value={signUpCredentials.name}
							placeholder='NAME'
							onChange={(e) => setSignUp(e, e.target.name)}
						/>
						<input
							type='text'
							name='email'
							value={signUpCredentials.email}
							placeholder='EMAIL'
							onChange={(e) => setSignUp(e, e.target.name)}
						/>
						<input
							type='password'
							name='pass'
							value={signUpCredentials.pass}
							placeholder='PASSWORD'
							onChange={(e) => setSignUp(e, e.target.name)}
						/>

						{!formSubmitted && (
							<p
								style={{
									color: '#ea0027',
									marginLeft: -120,
									marginTop: 10,
									marginBottom: -10,
									fontSize: 12,
								}}>
								{error}
							</p>
						)}

						<button
							type='button'
							className='form-button register-button'
							onClick={() => handleSubmit()}>
							Continue
						</button>

						<p
							style={{
								marginLeft: -72,
								marginTop: 10,
								fontSize: 13,
							}}>
							Already a fakedditor ?&nbsp;
							<span onClick={() => setSignInTime(!signInTime)}>
								LOG IN
							</span>
						</p>
					</form>
				)}
			</div>

			<button
				type='button'
				className='modal-close-button'
				onClick={() => setModalOpen(!modalOpen)}
			/>
		</Modal>
	)
}

export default AuthModal
