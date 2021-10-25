import React, { useEffect, useState }from 'react'
import './styles/App.css'
import Navbar from './components/Navbar'
import Hot from './components/Hot'
import Best from './components/Best'
import New from './components/New'
import Submit from './components/Submit'
import { getPost } from './components/Firebase'
import { BrowserRouter, Switch, Route } from 'react-router-dom'
import FullPost from './components/FullPost'

const App = () => {

	const loggedStatus = JSON.parse(localStorage.getItem('loggedIn'))

	const [isLoggedIn, setIsLoggedIn] = useState(loggedStatus)

	const loggedInUserName = localStorage.getItem('user')
	
	const [loggedInUser, setLoggedInUser] = useState(loggedInUserName)

	const [storedPosts, setStoredPosts] = useState([])

	
	const getDbPost = async () => {
		const post = await getPost()
		post.forEach((doc) => {
			if (doc.data().imgUrl) {
				setStoredPosts((prevState) => [
					...prevState,
					{
						title: doc.id,
						imgUrl: doc.data().imgUrl,
						author: doc.data().author,
						upvotes: doc.data().upvotes,
						date: doc.data().date.toDate(),
						comments: doc.data().comments,
					},
				])
			} else if (doc.data().url) {
				setStoredPosts((prevState) => [
					...prevState,
					{
						title: doc.id,
						url: doc.data().url,
						author: doc.data().author,
						upvotes: doc.data().upvotes,
						date: doc.data().date.toDate(),
						comments: doc.data().comments,
					},
				])			
			} else {
				setStoredPosts((prevState) => [
					...prevState,
					{
						title: doc.id,
						text: doc.data().text,
						author: doc.data().author,
						upvotes: doc.data().upvotes,
						date: doc.data().date.toDate(),
						comments: doc.data().comments
					},
				])
			}
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
						path='/fakeddit/hot'
						render={() => (
							<Hot
								isLoggedIn={isLoggedIn}
								storedPosts={storedPosts}
								setStoredPosts={setStoredPosts}
							/>
						)}
					/>
					<Route
						exact
						path='/fakeddit/'
						render={() => (
							<Best
								isLoggedIn={isLoggedIn}
								storedPosts={storedPosts}
								setStoredPosts={setStoredPosts}
							/>
						)}
					/>

					<Route
						exact
						path='/fakeddit/new'
						render={() => (
							<New
								isLoggedIn={isLoggedIn}
								storedPosts={storedPosts}
								setStoredPosts={setStoredPosts}
							/>
						)}
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

					<Route
						exact
						path='/fakeddit/:id'
						render={() => <FullPost storedPosts={storedPosts} />}
					/>
				</Switch>
			</BrowserRouter>
		</div>
	)
}

export default App;
