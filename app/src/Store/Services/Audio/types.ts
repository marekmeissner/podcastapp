import { DocumentPickerResponse } from 'react-native-document-picker'
import { ImageSourcePropType } from 'react-native'

export enum AUDIO_ACTIONS {
  SAVE = 'AUDIO_SAVE',
  GET_COLLECTION = 'AUDIO_GET_COLLECTION',
}

export interface AudioState {
  collection: Audio[]
}

export interface Audio {
  id: string
  thumbnail: string
  title: string
  author: string
  views: number
  created: string
  details: {
    description: string
    ratings: boolean
    donations: boolean
    audio: string | null
    }
}

export type AudioSmall = Omit<Audio, 'details'> 

export interface AddNewAudio {
  title: string
  description: string
  ratings: boolean
  donations: boolean
}

export interface AudioSave {
  type: AUDIO_ACTIONS.SAVE
  audio: Audio
}

export interface UploadTaskSnapshot {
  bytesTransferred: number
  totalBytes: number
}

export interface GetAudioCollection {
  type: AUDIO_ACTIONS.GET_COLLECTION
  collection: Audio[]
}

export type AudioActions = GetAudioCollection | AudioSave
