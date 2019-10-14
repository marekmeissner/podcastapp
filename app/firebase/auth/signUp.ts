import firebase from 'react-native-firebase';
import {UserSignUpCredentials} from '../../src/screens/Auth/types';

const EmailPasswordSignUp = async (newUser: UserSignUpCredentials) => {
  try {
    const response = await firebase
      .auth()
      .createUserWithEmailAndPassword(newUser.email, newUser.password);
    await firebase
      .firestore()
      .collection('users')
      .doc(response.user.uid)
      .set({
        email: newUser.email,
        accountName: newUser.accountName,
      });
  } catch (e) {
    throw new Error(e);
  }
};

export {EmailPasswordSignUp};
