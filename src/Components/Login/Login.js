import React, { useContext, useState } from 'react';
import google from '../../Icon/google.png'
import facebook from '../../Icon/fb.png'
import './Login.css';
import * as firebase from 'firebase/app';
import 'firebase/auth';
import firebaseConfig from './firebase.config';
import { UserContext } from '../../App';
import { useHistory, useLocation } from 'react-router-dom';
firebase.initializeApp(firebaseConfig);

function Login() {
    const [submittable, setSubmittable] = useState(true);
    const [newUser, setNewUser] = useState(true);
    const [place,setPlace,origin, setOrigin,destination, setDestination,loggedInUser, setLoggedInUser] = useContext(UserContext);
    
    // For Private Route...
    let history = useHistory();
    let location = useLocation();

    let { from } = location.state || { from: { pathname: "/" } };

    const provider = new firebase.auth.GoogleAuthProvider();
    const FB_Provider = new firebase.auth.FacebookAuthProvider();
    const handleFBLogin = () => {
      firebase.auth().signInWithPopup(FB_Provider)
      .then(res => {
          // This gives you a Facebook Access Token. You can use it to access the Facebook API.
          // var token = res.credential.accessToken;
          // The signed-in user info.
          const user = res.user;
          // console.log(user);
          const {displayName, email, photoURL} = user;
          console.log(displayName, email, photoURL)
          const newUser = {
              name: displayName,
              email,
              img: photoURL,
              signedIn: 'facebook'
          }
          setLoggedInUser(newUser);
          history.replace(from);
        })
        .catch(function(error) {
          // Handle Errors here.
          var errorMessage = error.message;
          // The email of the user's account used.
          var email = error.email;
          console.log(errorMessage, email);
          // ...
        });
    }

    const handleSignIn = () => {
      firebase.auth().signInWithPopup(provider)
      .then(res => {
        const {displayName, email, photoURL} = res.user;
        console.log(displayName, email, photoURL)
        const newUser = {
            name: displayName,
            email,
            img: photoURL,
            signedIn: 'google'
        }
        setLoggedInUser(newUser);
        history.replace(from);
      })
      .catch(err =>{
        console.log(err);
        console.log(err.message);
      })
    }
    
    const [realUser, setRealUser] = useState({
      signedIn: 'email',
      success: true
    });

    const [validUser, setValidUser] = useState(false);
    const [signedInUserName_or_Email, setSignedInUserName_or_Email] = useState({});
    const [signedInPassword, setSignedInPassword] = useState({});
    const handleBlur = (e) => {
      const name = e.target.name;
      const value = e.target.value;
      let isValidField = false;
      if(name === 'first name'){
        const re = /[A-Z]/i;
        const isValidName = re.test(value);
        if(isValidName){
          isValidField = true;
          settingUser("firstName", value);
        }

      }else if(name === 'last name'){
        const re = /[A-Z]/i;
        const isValidName = re.test(value);
        if(isValidName){
          isValidField = true;
          settingUser("lastName", value);
        }
        
      }else if(name === 'username/email'){
        const email = value;
        const re = /\S+@\S+\.\S+/;
        const isValidEmail = re.test(email);
        
        if(isValidEmail){
          isValidField = true;
          settingUser("username_or_email", value);
          
        }else{
          isValidField = false;
          settingUser("username_or_email", value);
        }
        
      }else if(name === 'password'){
        const password = value;
        const re = /\d{1}/;
        const isValidPassword = re.test(password) && password.length > 5;
        isValidField = isValidPassword; 
        settingUser("firstPassword", value);
        
      }else if(name === 'confirm password'){
        const password = value;
        const re = /\d{1}/;
        const isValidPassword = re.test(password) && password.length > 5;
        isValidField = isValidPassword; 
        settingUser("lastPassword", value);
        
      }else if(name === 'signedIn-username/email'){
        // console.log(name,"->",value);
        const email = value;
        const re = /\S+@\S+\.\S+/;
        const isValidEmail = re.test(email);
        if(isValidEmail){
          setSignedInUserName_or_Email({email})
        }

      }else if(name === 'signedIn-password'){
        const password = value;
        const re = /\d{1}/;
        const isValidPassword = re.test(password) && password.length > 5;
        if(isValidPassword){
          setSignedInPassword({password});
        }
      }
      // console.log(isValidField);
      setValidUser(isValidField);

    }

    //Eitake onno component e rakha jay...
    function settingUser(key, value){
      const newUserInfo = {...realUser};
      newUserInfo[key] = value;
      setRealUser(newUserInfo);
    }

    const handleSubmit = (e) => {
      settingUser("isValidUser", validUser);
      const { firstPassword, lastPassword, firstName, lastName } = realUser;
      const isSubmitted = validUser && firstName && lastName && ( firstPassword === lastPassword );
      
      if(newUser){
        if(!isSubmitted){
              setSubmittable(false);

        }else{
            // console.log(realUser);
            const {username_or_email, lastPassword} = realUser;
            const email = username_or_email;
            const password = lastPassword;
            firebase.auth().createUserWithEmailAndPassword(email,password)
            .then(res => {
              const newUserInfo = {...realUser};
              const {firstName, lastName} = newUserInfo;
              const fulName = firstName+" "+lastName;
              newUserInfo.name = fulName;
              const user = firebase.auth().currentUser;
              user.updateProfile({
                  displayName: fulName
              });
              newUserInfo.success = true;
              setLoggedInUser(newUserInfo);
              history.replace(from);
            })
            .catch(function(error) {
              // Handle Errors here.
              const errorMessage = error.message;
              console.log(errorMessage);
              const newUserInfo = {...realUser};
              newUserInfo.success = false;
              newUserInfo.error = errorMessage;
              setRealUser(newUserInfo);
              // ...
            });
            setSubmittable(true);
            // console.log(realUser);
          }
        }else{
          const {email} = signedInUserName_or_Email;
          const {password} = signedInPassword;
          if(email && password){
            // console.log(email, password);
            firebase.auth().signInWithEmailAndPassword(email, password)
            .then(res => {
              // console.log(res);
              const newUserInfo = {...realUser};
              newUserInfo.email = email;
              newUserInfo.password = password;
              newUserInfo.name = res.user.displayName;
              newUserInfo.success = true;
              setRealUser(newUserInfo);
              setLoggedInUser(newUserInfo);

              history.replace(from);
            })
            .catch(error => {
              // Handle Errors here.
              const errorMessage = error.message;
              const newUserInfo = {...realUser};
              newUserInfo.success = false;
              newUserInfo.error = errorMessage;
              setRealUser(newUserInfo);
              // ...
            });
          }
      }    
      e.preventDefault(); // Eta page reload howyar bapar ta atkiye dey...
    }

    const handleSignOut = () => {
      firebase.auth().signOut()
      .then(res => {
        // Sign-out successful.
        // console.log(res);
      }).catch(function(error) {
        // An error happened.
        console.log(error);
      });
    }

    const {success,error} = realUser;
    return (
      <div className="jumbotron text-center special-form">
        <form onSubmit={handleSubmit} className='container jumbotron sign-in-form'>{/*It's a field*/}
          {
              newUser
              ? <>
                  <h5 style={{textAlign: 'left'}}>Create an account</h5>
                  <input onBlur={handleBlur} className="form-control input" type="text" name="first name" placeholder="First Name" required/><br/>
                  <input onBlur={handleBlur} className="form-control input" type="text" name="last name" placeholder="Last Name" required/><br/>
                  <input onBlur={handleBlur} className="form-control input" type="username/email" name="username/email" placeholder="Username or Email" required/><br/>
                  <input onBlur={handleBlur} className="form-control input" type="password" name="password" placeholder="Password" required/><br/>
                  <input onBlur={handleBlur} className="form-control input" type="password" name="confirm password" placeholder="Confirm Password" required/><br/>
                  <input className="btn btn-warning create-btn" type="submit" value="Create an account"/><br/>
                  <p className='login-create'>Already have an account? <span onClick={() => setNewUser(false)} className="text-danger Login">Login</span></p>
              </>
              : <>
                  <h5 style={{textAlign: 'left'}}>Login</h5>
                  <input onBlur={handleBlur} className="form-control input" type="signedIn-username/email" name="signedIn-username/email" placeholder="Username or Email" required/><br/>
                  <input onBlur={handleBlur} className="form-control input" type="password" name="signedIn-password" placeholder="Password" required/><br/>
                  <div className="remember-forgot">
                      <div className="remember">
                          <input type="checkbox" name="remember" id=""/>
                          <label htmlFor="remember">Remember Me</label>
                      </div>
                      <div className="forgot">
                          <p onClick={() => handleSignOut()} className='text-warning Forgot-password'>Forgot Password</p>
                      </div>
                  </div>
                  <input className="btn btn-warning create-btn" type="submit" value="Login"/><br/>
                  <p className='login-create'>Don't have an account? <span onClick={() => setNewUser(true)} className="text-danger Create">Create an account</span></p>
              </>
          }
          {
            !submittable && <p className="text-danger"><small>The User is invalid!!! Please try again.</small></p>
          }
          {
            !success && <p className='text-danger'><small>{error}</small></p>
          }
        </form>
          <div className="container sign-in-or">
            <div className="or">
              <p></p>
              <em> Or </em>
              <p></p>
            </div>
            <button onClick={() => handleFBLogin()} className='btn btn-outline-info sign-in-btn'><img className='facebook-img' src={facebook} alt=""/>   Continue with Facebook</button><br/>
            <button onClick={ () => handleSignIn()} className='btn btn-outline-warning sign-in-btn'><img className='google-img' src={google} alt=""/> Continue with Google</button>
          </div>
      </div>
    );
  }

export default Login;