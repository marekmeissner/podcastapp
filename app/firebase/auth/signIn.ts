import * as firebase from 'firebase';
import {UserCredentials} from '../../src/screens/Auth/types';

const EmailPasswordSignIn = async ({email, password}: UserCredentials) => {
  try {
    await firebase.auth().signInWithEmailAndPassword(email, password);
  } catch (e) {
    throw new Error(e);
  }
};

const provider = new firebase.auth.GoogleAuthProvider();
provider.addScope(
  'https://www.googleapis.com/auth/admin.directory.customer.readonly',
);

const GoogleSignIn = async () => {
  try {
    const response = await firebase.auth().signInWithPopup(provider);
    return response.user;
  } catch (e) {
    throw new Error(e);
  }
};

export {EmailPasswordSignIn, GoogleSignIn};
