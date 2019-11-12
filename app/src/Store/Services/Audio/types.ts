export enum AUDIO_ACTIONS {
  SAVE = 'AUDIO_SAVE',
  GET_COLLECTION = 'AUDIO_GET_COLLECTION',
}

export interface AudioState {
  collection: Audio[]
}

export interface Audio {
  thumbnail: string
  audio: string
  created: string
  title: string
  description: string
}

export interface AudioSave {
  type: AUDIO_ACTIONS.SAVE
  audio: Audio
}

export interface GetAudioCollection {
  type: AUDIO_ACTIONS.GET_COLLECTION
  collection: Audio[]
}

export type AudioActions = GetAudioCollection | AudioSave
