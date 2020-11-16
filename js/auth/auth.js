import Users from './Users.js';
import { firebaseError } from '../fireBase/firebaseError.js';

const
  loginEl = document.querySelector('.login'),
  loginFormEl = loginEl.querySelector('.loginForm'),
  loginSignUp = loginFormEl.querySelector('.loginSignUp'),
  addPostElem = document.querySelector('.add-post'),
  postsElem = document.querySelector('.posts'),

  userElem = document.querySelector('.user'),
  userNameElem = userElem.querySelector('.user-name'),
  buttonNewPostElem = document.querySelector('.button-new-post'),
  sidebarNavElem = document.querySelector('.sidebar-nav'),
  exitElem = document.querySelector('.exit')
;

const toggleAuthDom = () => {
  const user = Users.user;

  if (user) {
    userNameElem.textContent = user.displayName;
    loginEl.style.display = 'none';
    userElem.style.display = 'flex';
    buttonNewPostElem.style.display = 'flex';
    sidebarNavElem.style.display = 'block';
    postsElem.classList.remove('noVisible');
  }
  else {
    userNameElem.textContent = '';
    loginEl.style.display = '';
    userElem.style.display = '';
    buttonNewPostElem.style.display = '';
    sidebarNavElem.style.display = '';
    addPostElem.classList.remove('visible');
    postsElem.classList.remove('noVisible');
  }
};

const auth = async event => {
  event.preventDefault();

  const [email, password] = event.target.elements;

  try {
    await Users.logIn(email.value, password.value, toggleAuthDom);
    loginFormEl.reset();
  }
  catch (error) {
    alert(firebaseError[error.code]);
  }
};

const registration = async event => {
  event.preventDefault();

  const email = loginFormEl.querySelector('[name="email"]').value;
  const password = loginFormEl.querySelector('[name="password"]').value;

  try {
    await Users.SignUp(email, password, toggleAuthDom);
    loginFormEl.reset();
  }
  catch (error) {
    alert(firebaseError[error.code]);
  }
};

const exit = async event => {
  event.preventDefault();

  try {
    await Users.logOut();
  }
  catch (error) {
    console.log(error);
  }
};

loginFormEl.addEventListener('submit', auth);
loginSignUp.addEventListener('click', registration);
exitElem.addEventListener('click', exit);

Users.initUser(toggleAuthDom);