// jest.config.js

module.exports = {
  preset: '@testing-library/react-native',
  transform: {
    '\\.js$': '<rootDir>/node_modules/react-native/jest/preprocessor.js'
  },
  "roots": [
    "<rootDir>",
    "./src/Utils/test",
    "./src/Components"
  ],
  "modulePaths": [
    "<rootDir>",
    "./src/Utils/test",
    "./src/Components"
  ],
  "moduleDirectories": [
    "node_modules"
  ],
  testEnvironment: 'jsdom',
  transformIgnorePatterns: [
    'node_modules/(?!(react-native|react-navigation|native-base|react-native-drawer|native-base-shoutem-theme|react-native-vector-icons|react-native-easy-grid|react-navigation-stack|react-native-gesture-handler|react-native-splash-screen|react-native-responsive-screen|react-native-svg|static-container|react-native-camera))'
  ],
  moduleNameMapper: {
        // alias imports of react-native to react-native-web
        '^react-native$': 'react-native-web',
    // block react-art
    '^react-art$': 'node-noop'
  },
  setupFilesAfterEnv: ['./__mocks__/mockFirebase.ts', './__mocks__/mockAsyncStorage.ts', '@testing-library/react-native/cleanup-after-each'],
}
