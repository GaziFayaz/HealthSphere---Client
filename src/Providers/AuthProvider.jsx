import { createContext, useEffect, useState } from "react";
import {
	getAuth,
	signInWithPopup,
	createUserWithEmailAndPassword,
	GoogleAuthProvider,
	onAuthStateChanged,
	signOut,
	signInWithEmailAndPassword,
	updateProfile,
  GithubAuthProvider,
} from "firebase/auth";
import { app } from "../Firebase/firebase.config";

export const AuthContext = createContext(null);
const auth = getAuth(app);
const googleProvider = new GoogleAuthProvider();
const githubProvider = new GithubAuthProvider();
const AuthProvider = ({ children }) => {
	const [user, setUser] = useState(null);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		const unsubscribe = onAuthStateChanged(auth, (loggedInUser) => {
			// console.log(loggedInUser);
			setUser(loggedInUser);
			setLoading(false);
		});
		return () => unsubscribe();
	}, []);

	const createUserEmailPassword = (email, password) => {
		setLoading(true);
		return createUserWithEmailAndPassword(auth, email, password);
	};

	const signInEmailPassword = (email, password) => {
		setLoading(true);
		return signInWithEmailAndPassword(auth, email, password);
	};

	const customizeProfile = (displayName, photoURL) => {
		// setLoading(true)
		return updateProfile(auth.currentUser, {
			displayName: displayName,
			photoURL: photoURL,
		});
	};

	const signInGoogle = () => {
    setLoading(true);
		return signInWithPopup(auth, googleProvider);
	};

  const signInGithub = () => {
    setLoading(true);
    return signInWithPopup(auth, githubProvider);
  }

	const logout = () => {
		setLoading(true);
		return signOut(auth);
	};

	const authInfo = {
		user,
		setUser,
		loading,
		setLoading,
		createUserEmailPassword,
		signInEmailPassword,
		customizeProfile,
		signInGoogle,
    signInGithub,
		logout,
	};

	return (
		<AuthContext.Provider value={authInfo}>{children}</AuthContext.Provider>
	);
};

export default AuthProvider;
