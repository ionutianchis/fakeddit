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

export const addUser = (email, password) => {
	createUserWithEmailAndPassword(auth, email, password)
 		.then((userCredential) => {
				const user = userCredential.user
				console.log(user)
		})
		.catch((error) => {
		})

}
export const loginUser = async (email, password) => {
	try {
		await signInWithEmailAndPassword(auth, email, password)
		return true
	} catch (error) {
		return error.message
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


export default firebaseApp
