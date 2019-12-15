import React from 'react'
import { StyleSheet } from 'react-native'
import { Thumbnail, View, Button, Text, Icon } from 'native-base'
import { COLORS } from '@util/styles/colors'

interface Props {
  uri: string
  editMode: boolean
  style?: { [key: string]: string | number }
  large?: boolean
  onUpload: () => Promise<void>
  circular?: boolean
}

const styles = StyleSheet.create({
  button: {
    position: 'absolute',
    zIndex: 10,
    backgroundColor: 'rgba(30,36,46, .6)',
    width: '100%',
    height: '100%',
    borderRadius: 50,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  icon: {
    color: COLORS.SUCCESS,
    fontSize: 20,
  },
})

const Avatar: React.FC<Props> = ({ uri, editMode = false, style, large, circular, onUpload }) => {
  return (
    <View>
      <Thumbnail source={{ uri }} style={style} large={large} circular={circular} />
      {editMode && (
        <Button style={styles.button} onPress={() => onUpload()}>
          <Icon style={styles.icon} type="FontAwesome5" name="user-edit" />
        </Button>
      )}
    </View>
  )
}

export default Avatar
