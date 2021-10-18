import React, { useEffect, useState }from 'react'
import './styles/App.css'
import Navbar from './components/Navbar'
import Home from './components/Home'
import Best from './components/Best'
import Submit from './components/Submit'
import { getPost } from './components/Firebase'
import { BrowserRouter, Switch, Route } from 'react-router-dom'
import {formatDistance} from 'date-fns'
const App = () => {
  
	const [isLoggedIn, setIsLoggedIn] = useState(false)
	
	const [storedPosts, setStoredPosts] = useState([])

	const today = new Date()

	const getDbPost = async () => {
		const post = await getPost()
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
	}, [])

	console.log(storedPosts)
	return (
		<div className='container'>
			<BrowserRouter basename='/'>
				<Navbar isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />

				<Switch>
					<Route
						exact
						path='/fakeddit/'
						render={() => <Home isLoggedIn={isLoggedIn} storedPosts={storedPosts}/>}
				  	/>
					<Route
						exact
						path='/fakeddit/best'
						render={() => <Best isLoggedIn={isLoggedIn} />}
				  	/>
				  
					<Route
						exact
						path='/fakeddit/new'
						render={() => (
							<Home
								isLoggedIn={isLoggedIn}
							/>
						)}
				  	/>
				  
				  <Route exact path='/fakeddit/submit' render={() => <Submit />}/>
				</Switch>
			</BrowserRouter>
		</div>
  )
}

export default App;
