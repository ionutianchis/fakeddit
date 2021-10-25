import { initializeApp} from 'firebase/app'
import {
	getFirestore,
	collection,
	doc,
	getDocs,
	setDoc,
} from 'firebase/firestore'
import {
	getAuth,
	createUserWithEmailAndPassword,
	signInWithEmailAndPassword,
	signOut
} from 'firebase/auth'

const firebaseApp = initializeApp({
	apiKey: 'AIzaSyAHL_OMClzsJ1Y-2qiyGsAegwwQE2JS8tw',
	authDomain: 'fakeddit-c4308.firebaseapp.com',
	projectId: 'fakeddit-c4308',
	storageBucket: 'fakeddit-c4308.appspot.com',
	messagingSenderId: '244021640059',
	appId: '1:244021640059:web:f4d051acaab06f30de5bde',
})

const db = getFirestore()

const auth = getAuth()

const storeUserName = async (email, name) => {
	try {
		await setDoc(doc(db, 'users', name), {
			email: email,
			name: name
		})
	} catch (error) {
		
	}
}

export const addUser = async (email, password, name) => {
	try {
		await createUserWithEmailAndPassword(auth, email, password)
		storeUserName(email, name)
	} catch (error) {
		console.error(error)
	}
}

export const getUserName = async (email) => {
	const querySnapshot = await getDocs(collection(db, 'users'))
	return querySnapshot
}

export const loginUser = async (email, password) => {
	try {
		await signInWithEmailAndPassword(auth, email, password)
		return true
	} catch (error) {
		return error.message
	}
}

export const storePost = async (title, text, author, upvotes, date, comments) => {
	try {
		await setDoc(doc(db, 'posts', title), {
			text: text,
			author: author,
			upvotes: upvotes,
			date: date,
			comments: comments,
		})
	} catch (error) {
		console.error(error)
	}
}

export const storeImgPost = async (title, imgUrl, author, upvotes, date, comments) => {
	try {
		await setDoc(doc(db, 'posts', title), {
			imgUrl: imgUrl,
			author: author,
			upvotes: upvotes,
			date: date,
			comments: comments
		})
	} catch (error) {
		console.error(error)
	}
}
export const storeLinkPost = async (title, url, author, upvotes, date, comments) => {
	try {
		await setDoc(doc(db, 'posts', title), {
			url: url,
			author: author,
			upvotes: upvotes,
			date: date,
			comments: comments,
		})
	} catch (error) {
		console.error(error)
	}
}

export const getPost = async () => {
	const querySnapshot = await getDocs(collection(db, 'posts'))
	return querySnapshot
}


export const incrementDbVote = async (e) => {
	const post = await getPost()
	post.forEach((currDoc) => {
		if (currDoc.id === e.target.name) {
			const postRef = doc(db, 'posts', currDoc.id)
 			setDoc(
				postRef,
	 	 			{ upvotes: currDoc.data().upvotes+1 },
 	 				{ merge: true }
			) 
		}
	}) 
}

export const decrementDbVote = async (e) => {
	const post = await getPost()
	post.forEach((currDoc) => {
		if (currDoc.id === e.target.name) {
			const postRef = doc(db, 'posts', currDoc.id)
 			setDoc(
				postRef,
	 	 			{ upvotes: currDoc.data().upvotes-1 },
 	 				{ merge: true }
			) 
		}
	}) 
}

export const logOutUser = async () => {
	try {
		await signOut(auth)
	} catch (error) {
		console.error(error)
	}
}
export default firebaseApp
