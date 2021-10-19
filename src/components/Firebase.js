import { initializeApp } from 'firebase/app'
import {
	getFirestore,
	collection,
	doc,
	getDocs,
	setDoc,
} from 'firebase/firestore'

const firebaseApp = initializeApp({
	apiKey: 'AIzaSyAHL_OMClzsJ1Y-2qiyGsAegwwQE2JS8tw',
	authDomain: 'fakeddit-c4308.firebaseapp.com',
	projectId: 'fakeddit-c4308',
	storageBucket: 'fakeddit-c4308.appspot.com',
	messagingSenderId: '244021640059',
	appId: '1:244021640059:web:f4d051acaab06f30de5bde',
})

const db = getFirestore()

export const storeUser = async (userName, userMail, userPass) => {
	try {
		await setDoc(doc(db, 'credentials', userName), { 
			name: userName,
			email: userMail,
			pass: userPass,
		})
	} catch (error) {
		console.error('Error adding document', error)
	}
}

export const getUsers = async () => {
	const querySnapshot = await getDocs(collection(db, 'credentials'))
	return querySnapshot
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


export default firebaseApp
