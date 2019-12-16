import { useDispatch as useDispatchJS } from 'react-redux'
import { ThunkDispatch } from 'redux-thunk'
import { AnyAction, Action } from 'redux'
import { RootState } from '@service/rootReducer'

type DispatchAction<T extends AnyAction = Action> = ThunkDispatch<RootState, undefined, T>
export const useDispatch: () => DispatchAction = useDispatchJS
