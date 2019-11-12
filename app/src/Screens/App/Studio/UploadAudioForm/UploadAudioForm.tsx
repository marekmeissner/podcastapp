import React from 'react'
import { Text } from 'native-base'

interface Props {
  audio: {
    name: string
    uri: string
  }
}

const UploadAudioForm: React.FC<Props> = ({ audio }) => {
  console.warn(audio)
  return <Text>upload</Text>
}

export default UploadAudioForm
