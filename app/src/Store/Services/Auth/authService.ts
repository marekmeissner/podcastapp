import AsyncStorage from '@react-native-community/async-storage'
import { ACCESS_TOKEN_KEY } from '@util/constants/constants'
import firestore from '@react-native-firebase/firestore'
import { User } from './types'

class AuthService {
  static getUser = (uid: string) => {
    const user = firestore()
      .collection('users')
      .doc(uid)
      .get()
      .then(doc => doc.data() as User)

    return user
  }

  static setUserToken = async (token: string) => {
    try {
      await AsyncStorage.setItem(ACCESS_TOKEN_KEY, token)
    } catch (e) {
      throw new Error(e)
    }
  }

  static getUserToken = async () => {
    try {
      const value = await AsyncStorage.getItem(ACCESS_TOKEN_KEY)
      if (value !== null) {
        return value
      }
    } catch (e) {
      throw new Error(e)
    }
  }

  static removeUserToken = async () => {
    try {
      await AsyncStorage.removeItem(ACCESS_TOKEN_KEY)
    } catch (e) {
      throw new Error(e)
    }
  }

  static editUser = async (uid: string, user: Partial<User>) => {
    try {
      await firestore()
        .doc(`users/${uid}`)
        .update(user)
    } catch (e) {
      throw new Error(e)
    }
  }
}

export default AuthService
