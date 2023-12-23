import { GithubAuthProvider, GoogleAuthProvider, getAuth, signInWithPopup, signOut } from "firebase/auth";
import app from "../../firebase/firebase.config";
import { useState } from "react";

const Login = () => {
    const [user, setUser] = useState(null);
    const auth = getAuth(app);
    const googleProvider = new GoogleAuthProvider();
    const githubProvider = new GithubAuthProvider();

    const handleGoogleSignIn = () => {
        // console.log('google account')
        signInWithPopup(auth, googleProvider)
            .then(result => {
                // console.log(result.user)
                const loggedInUser = result.user;
                console.log(loggedInUser);
                setUser(loggedInUser);
            })
            .catch(error => {
                console.error(error)
            })
    }

    const handleSignOut = () => {
        signOut(auth)
            .then(result => {
                console.log(result)
                setUser(null)
            })
            .catch(error => {
                console.log(error)

            })
    }

    const handleGithubSignIn = () => {
        signInWithPopup(auth,githubProvider)
        .then(result =>{
            console.log(result.user)
            setUser(result.user)
        })
        .catch(error =>{
            console.log(error)
        })
    }

    return (
        <div>
            {
                user ?
                    <button onClick={handleSignOut}>sign out</button> :
                    <div>
                        <button onClick={handleGoogleSignIn}>Google Login</button>
                        <button onClick={handleGithubSignIn}>Github Login</button>
                    </div>
            }
            {
                user && <div>
                    <p>UserName : {user.displayName}</p>
                    <h1>Email : {user.email}</h1>
                    <p>PhotoUrl : {user.photoURL}</p>
                    <img src={user.photoURL} alt="" />
                </div>
            }
        </div>
    );
};

export default Login;