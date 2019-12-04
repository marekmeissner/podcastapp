import React from 'react'
import { Thumbnail, Button, Text } from 'native-base'
import { View, StyleSheet } from 'react-native'

interface Props {
  testID: string
  children: string
  avatar: string
  style?: { [key: string]: number | string }
  onUpload: () => Promise<void>
  onChange: (e: React.ChangeEvent<any>) => void
  square: boolean
  large: boolean
}

const styles = StyleSheet.create({
  upload: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    padding: 20,
    paddingTop: 40,
  },
  trumbnail: {
    marginLeft: -20,
    height: 77.25,
    width: 125,
  },
  button: {
    height: '100%',
  },
})

const UploadImage: React.FC<Props> = ({ testID, children, onUpload, style, avatar, ...props }) => {
  return (
    <View testID={testID} style={[styles.upload, style]}>
      <Thumbnail style={styles.trumbnail} source={{ uri: avatar }} {...props} />
      <Button style={styles.button} testID={'upload'} transparent small onPress={() => onUpload()}>
        <Text>{children}</Text>
      </Button>
    </View>
  )
}

export default UploadImage
