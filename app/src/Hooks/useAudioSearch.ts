import { useState } from 'react'
import { useDispatch } from './useDispatch'
import { useAsyncEffect } from './useAsyncEffect'
import { useSelector } from 'react-redux'
import { debounce } from 'lodash'
import { selectAudiosCollection, getAudiosSearch, filterAudiosByQuery } from '@service/Audio/audioReducer'

export const useAudiosSearch = (doFetch?: boolean, deps: any[] = []) => {
  const [query, changeQuery] = useState('')
  const [debouncedQuery, changeDebouncedQuery] = useState('')
  const [audiosLoading, setAudiosLoading] = useState(false)
  const dispatch = useDispatch()

  const setDebouncedQuery = debounce((query: string) => {
    changeDebouncedQuery(query)
  }, 300)

  useAsyncEffect(async () => {
    if (doFetch) {
      setAudiosLoading(true)
      try {
        await dispatch(getAudiosSearch({ limit: 10, searchPhrase: query }))
      } catch (e) {
      } finally {
        setAudiosLoading(false)
      }
    }
  }, [debouncedQuery, ...deps])

  const audios = useSelector(selectAudiosCollection)

  return {
    query,
    changeQuery: (query: string) => {
      changeQuery(query)
      setDebouncedQuery(query)
    },
    audiosLoading,
    audios: filterAudiosByQuery(audios, query),
  }
}
