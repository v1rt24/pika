import { validEmail, validationLength } from '../utils.js';
import { APIKEY } from '../fireBase/configFireBase.js';

class Users {
  static user = null;

  static async initUser (handler) {
    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        this.user = user;
      }
      else {
        this.user = null;
      }

      if (handler) {
        handler();
      }
    });
  }

  static async logIn (email, password) {
    if (!validationLength(email) || !validationLength(password)) {
      alert('Заполните все поля');
      return false;
    }

    try {
      const res = await firebase.auth().
        signInWithEmailAndPassword(email, password);
    }
    catch (error) {
      throw error;
    }
  }

  static async logOut () {
    try {
      await firebase.auth().signOut();
    }
    catch (error) {
      throw error;
    }
  }

  static async SignUp (email, password, handler) {

    if (!validationLength(email) || !validationLength(password)) {
      alert('Заполните все поля');
      return false;
    }

    if (!validEmail(email)) {
      alert('Введите корректную почту');
      return false;
    }

    try {
      const res = await firebase.auth().
        createUserWithEmailAndPassword(email, password);

      await this.editUser(email.match(/^[^@]+/)[0], handler);
    }
    catch (error) {
      throw error;
    }
  }

  static async editUser (displayName, handler) {
    try {
      const user = firebase.auth().currentUser;

      await user.updateProfile({
        displayName,
      });

      if (handler) {
        handler();
      }
    }
    catch (error) {
      throw error;
    }
  }
}

export default Users;