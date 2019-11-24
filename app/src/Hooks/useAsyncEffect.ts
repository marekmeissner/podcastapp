import { useEffect } from 'react'

export const useAsyncEffect = (effect: () => Promise<any>, deps?: any[]) => {
  useEffect(() => {
    effect().catch(e => {
      console.warn('useAsyncEffect error', e)
    })
  }, deps)
}
