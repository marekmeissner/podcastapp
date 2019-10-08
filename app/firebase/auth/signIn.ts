import firebase from 'react-native-firebase';
import {UserCredentials} from '../../src/screens/Auth/types';

const EmailPasswordSignIn = async ({email, password}: UserCredentials) => {
  try {
    await firebase.auth().signInWithEmailAndPassword(email, password);
  } catch (e) {
    throw new Error(e);
  }
};

export {EmailPasswordSignIn};