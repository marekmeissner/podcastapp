/* eslint-disable */
export const config = jest.mock('@react-native-firebase/storage', () => ({
  doc: jest.fn(),
}))
