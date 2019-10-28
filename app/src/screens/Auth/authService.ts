import AsyncStorage from '@react-native-community/async-storage';
import {ACCESS_TOKEN_KEY, USER_ID} from '../../utils/constants';
import firebase from 'react-native-firebase';

class AuthService {
  static getUser = (uid: string) => {
    const user = firebase
      .firestore()
      .collection('users')
      .doc(uid)
      .get()
      .then(doc => doc.data());

    return user;
  };

  static setUserToken = async (token: string) => {
    try {
      await AsyncStorage.setItem(ACCESS_TOKEN_KEY, token);
    } catch (error) {}
  };

  static getUserToken = async () => {
    try {
      const value = await AsyncStorage.getItem(ACCESS_TOKEN_KEY);
      if (value !== null) {
        return value;
      }
    } catch (e) {}
  };

  static setUserId = async (uid: string) => {
    try {
      await AsyncStorage.setItem(USER_ID, uid);
    } catch (error) {}
  };

  static getUserId = async () => {
    try{
      await AsyncStorage.getItem(USER_ID);
    } catch(error){}
  } 

  static removeUserToken = async () => {
    try {
      await AsyncStorage.removeItem(ACCESS_TOKEN_KEY);
    } catch (e) {}
  };
}

export default AuthService;
