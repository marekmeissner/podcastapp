/* eslint-disable */
export const config = jest.mock('@react-native-firebase/firestore', () => ({
    collection: jest.fn()  }))