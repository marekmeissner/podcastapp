import firebase from 'react-native-firebase';
import {UserCredentials} from '../../src/redux/reducers/auth/types';

const EmailPasswordSignIn = async ({email, password}: UserCredentials) => {
  try {
    const user = await firebase
      .auth()
      .signInWithEmailAndPassword(email, password);
    console.warn(
      firebase
        .firestore()
        .collection('users')
        .doc(user.user.uid)
        .get()
        .then(doc => doc.data()),
    );
  } catch (e) {
    throw new Error(e);
  }
};

export {EmailPasswordSignIn};
