/* eslint-disable */
export const config = jest.mock('@react-native-firebase/auth', () => ({
  signInWithEmailAndPassword: jest.fn(),
  sendPasswordResetEmail: jest.fn(),
  firebase: { auth: () => ({ signInWithEmailAndPassword: jest.fn() }) },
}))
