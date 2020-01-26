/* eslint-disable */
export const authMock = jest.mock('@react-native-firebase/auth', () => ({
  signInWithEmailAndPassword: jest.fn(),
  sendPasswordResetEmail: jest.fn(),
  firebase: { auth: () => ({ signInWithEmailAndPassword: jest.fn() }) },
}))
