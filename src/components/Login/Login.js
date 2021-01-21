import React, { useContext } from 'react';
import Button from '@material-ui/core/Button';
import firebaseConfig from './firebase.config';
import firebase from "firebase/app";
import "firebase/auth";
import { makeStyles } from '@material-ui/core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faGoogle, faFacebook } from '@fortawesome/free-brands-svg-icons'
import {UserContext} from '../../App'



const useStyles = makeStyles((theme) => ({
    center: {
      textAlign: 'center',
    },
    icon: {
        paddingRight: '5px',
    },
    button: {
        marginBottom: '8px',
    }
  }));
  


const Login = () => {
    const classes = useStyles();

    const [loggedInUser, setLoggedInUser] = useContext(UserContext);

    if(firebase.apps.length === 0) {
        firebase.initializeApp(firebaseConfig);
    }

    const handleGoogleSignIn = () => {
        const provider = new firebase.auth.GoogleAuthProvider();
        firebase.auth().signInWithPopup(provider)
        .then((result) => {
            const user = result.user;   
            const {displayName, email} = user;
            const signedInUser = {name: displayName, email};
            setLoggedInUser(signedInUser);
            console.log(user);
        }).catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            const email = error.email;
            const credential = error.credential;
        });
    }
    const handleFacebookSignIn = () => {
        console.log('facebook');
    }

    return (
        <div className={classes.center}>
            <h1>This is Login</h1>
            <Button
                onClick={handleGoogleSignIn}
                variant="contained"  
                className={classes.button}>
            <FontAwesomeIcon icon={faGoogle}  className={classes.icon}/>
                Sign in with Google
            </Button>

            <br/>

            <Button
                onClick={handleFacebookSignIn}
                variant="contained" >
            <FontAwesomeIcon icon={faFacebook} size='lg' className={classes.icon}/>
                Sign in with facebook
            </Button>
        </div>
    );
};

export default Login;