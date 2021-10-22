import React, { useEffect, useState }from 'react'
import './styles/App.css'
import Navbar from './components/Navbar'
import Home from './components/Home'
import Best from './components/Best'
import Submit from './components/Submit'
import { getPost } from './components/Firebase'
import { BrowserRouter, Switch, Route } from 'react-router-dom'
import { formatDistance } from 'date-fns'

const App = () => {
	const loggedStatus = JSON.parse(localStorage.getItem('loggedIn'))

	const [isLoggedIn, setIsLoggedIn] = useState(loggedStatus)
	
	const [loggedInUser, setLoggedInUser] = useState('')

	const [storedPosts, setStoredPosts] = useState([])

	
	const getDbPost = async () => {
		const post = await getPost()
		const today = new Date()
		post.forEach((doc) => {
			setStoredPosts((prevState) => [
				...prevState,
				{
					title: doc.id,
					text: doc.data().text,
					author: doc.data().author,
					upvotes: doc.data().upvotes,
					date: formatDistance(doc.data().date.toDate(), today)
				},
			])
		})
	}

	useEffect(() => {
		getDbPost()
	// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [])
	return (
		<div className='container'>
			<BrowserRouter basename='/'>
				<Navbar
					isLoggedIn={isLoggedIn}
					setIsLoggedIn={setIsLoggedIn}
					loggedInUser={loggedInUser}
					setLoggedInUser={setLoggedInUser}
				/>

				<Switch>
					<Route
						exact
						path='/fakeddit/'
						render={() => (
							<Home
								isLoggedIn={isLoggedIn}
								storedPosts={storedPosts}
								setStoredPosts={setStoredPosts}
							/>
						)}
					/>
					<Route
						exact
						path='/fakeddit/best'
						render={() => <Best isLoggedIn={isLoggedIn} />}
					/>

					<Route
						exact
						path='/fakeddit/new'
						render={() => <Home isLoggedIn={isLoggedIn} />}
					/>

					<Route
						exact
						path='/fakeddit/submit'
						render={() => (
							<Submit
								loggedInUser={loggedInUser}
								storedPosts={storedPosts}
								setStoredPosts={setStoredPosts}
								isLoggedIn={isLoggedIn}
							/>
						)}
					/>
				</Switch>
			</BrowserRouter>
		</div>
	)
}

export default App;
