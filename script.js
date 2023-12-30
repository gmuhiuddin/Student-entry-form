import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import { getAuth, onAuthStateChanged, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";
import {getFirestore, doc, collection, setDoc, addDoc, getDoc } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyAx0FsvTXV5cw7xQ7bZ6WCY9gbppoVe518",
  authDomain: "students-entry-form.firebaseapp.com",
  projectId: "students-entry-form",
  storageBucket: "students-entry-form.appspot.com",
  messagingSenderId: "348829816464",
  appId: "1:348829816464:web:94b6cda53d43b256cb2a15",
  measurementId: "G-6G8WLDM3FM"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

const registerTxt = document.getElementById('register-txt');
const loginTxt = document.getElementById('login-txt');
const registerForm = document.getElementById('register-form');
const loginForm = document.getElementById('login-form');
const formContainer = document.getElementsByClassName('form-container');
const container = document.getElementsByClassName('container');
let uid;

registerTxt.addEventListener('click', () => {
  registerForm.style.display = 'block'
  loginForm.style.display = 'none'
})

loginTxt.addEventListener('click', () => {
  LoginForm.style.display = 'block'
  registerForm.style.display = 'none'
})

registerForm.addEventListener('submit', registerUserFunc)
loginForm.addEventListener('submit', loginFunc)

onAuthStateChanged(auth, async (user) => {
  if (user) {
    // User is signed in, see docs for a list of available properties
    // https://firebase.google.com/docs/reference/js/auth.user
    uid = user.uid;
    formContainer[0].style.display = 'none';
    container[0].style.display = 'block'

    let userInfo = await getDoc(doc(db, 'user info', uid))
    console.log(userInfo.data())
    // ...
  } else {
    // User is signed out
    // ...
    formContainer[0].style.display = 'flex';
    container[0].style.display = 'none'
  }
})

function registerUserFunc(e) {
  e.preventDefault()


  createUserWithEmailAndPassword(auth, `${e.target[2].value}@gmail.com`, e.target[3].value)
    .then(async (userCredential) => {
      // Signed up 
      const user = userCredential.user;
      uid = user.uid
      formContainer[0].style.display = 'none';
      container[0].style.display = 'block';

await setDoc(doc(db, 'user info', uid), {
  userName: e.target[0].value,
  userFName: e.target[1].value,
  userEmail: e.target[2].value
})
e.target[0].value = '';
e.target[1].value = '';
e.target[2].value = '';
e.target[3].value = '';
      // ...
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      formContainer[0].style.display = 'flex';
      container[0].style.display = 'none';
      e.target[2].value = '';
      e.target[3].value = '';
      // ..
    });
}

function loginFunc (e){
  e.preventDefault();

  signInWithEmailAndPassword(auth,`${e.target[0].value}@gmail.com`, e.target[1].value)
  .then((userCredential) => {
    // Signed in 
    const user = userCredential.user;
    uid = user.uid
    formContainer[0].style.display = 'none';
      container[0].style.display = 'block';
    e.target[0].value = '';
    e.target[1].value = '';
    // ...
  })
  .catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;
    formContainer[0].style.display = 'flex';
    container[0].style.display = 'none';
    e.target[1].style.boxShadow = '0px 0px 7px red';
    e.target[1].value = '';
  });
}

// signOut(auth).then(() => {
//   // Sign-out successful.
// }).catch((error) => {
//   // An error happened.
// });
