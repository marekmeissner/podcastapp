module.exports = {
  presets: ['module:metro-react-native-babel-preset'],
  plugins: [
    [
      'module-resolver',
      {
        root: ['./app'],
        extensions: ['.js', '.ts', '.tsx', '.json'],
        alias: {
          '@hoc': './src/HOC',
          '@hook': './src/Hooks',
          '@util': './src/Utils',
          '@screen': './src/Screens',
          '@asset': './src/Assets',
          '@component': './src/Components',
          '@navigation': './src/Navigation',
          '@service': './src/Store/Services',
        },
      },
    ],
  ],
}
