// jest.config.js

module.exports = {
  preset: '@testing-library/react-native',
  transform: {
    '\\.js$': '<rootDir>/node_modules/react-native/jest/preprocessor.js',
    "^.+\\.[t|j]sx?$": "babel-jest"
  },
  testEnvironment: 'jsdom',
  transformIgnorePatterns: [
    'node_modules/(?!(react-native|react-navigation|native-base|react-native-drawer|native-base-shoutem-theme|react-native-vector-icons|react-native-easy-grid|react-navigation-stack|react-native-gesture-handler|react-native-splash-screen|react-native-responsive-screen|react-native-svg|static-container|react-native-camera))'
  ],
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
  setupFilesAfterEnv: ['./__mocks__/mockFirebase.ts', './__mocks__/mockAsyncStorage.ts', '@testing-library/react-native/cleanup-after-each'],
}
