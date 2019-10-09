// jest.config.js
const { defaults: tsjPreset } = require('ts-jest/presets')

module.exports = {
  ...tsjPreset,
  preset: 'react-native',
  transform: {
    ...tsjPreset.transform,
    '\\.js$': '<rootDir>/node_modules/react-native/jest/preprocessor.js'
  },
  testEnvironment: 'jsdom',
  transformIgnorePatterns: [
    'node_modules/(?!(react-native|react-navigation|redux-persist|native-base|react-native-drawer|native-base-shoutem-theme|react-native-vector-icons|react-native-easy-grid|react-navigation-stack|react-native-gesture-handler|react-native-splash-screen|react-native-responsive-screen|react-native-svg|static-container|react-native-camera))'
  ],
  globals: {
    'ts-jest': {
      babelConfig: true
    }
  },
  moduleNameMapper: {
        // alias imports of react-native to react-native-web
        '^react-native$': 'react-native-web',
    // block react-art
    '^react-art$': 'node-noop'
  },
  // This is the only part which you can keep
  // from the above linked tutorial's config:
  cacheDirectory: '.jest/cache',
  setupFilesAfterEnv: ['./__mocks__/mockFirebase.ts'],
}
