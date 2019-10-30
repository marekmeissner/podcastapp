import { applyMiddleware, createStore } from 'redux'
import thunk from 'redux-thunk'
import { persistStore, persistReducer } from 'redux-persist'
import { composeWithDevTools } from 'redux-devtools-extension'
import AsyncStorage from '@react-native-community/async-storage'

import { rootReducer } from './Services/rootReducer'

const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
  whitelist: ['auth'],
}

const configureStore = (initialState?: object) => {
  const persistedReducer = persistReducer(persistConfig, rootReducer)
  const store = createStore(persistedReducer, initialState || {}, composeWithDevTools(applyMiddleware(thunk)))
  const persistor = persistStore(store)

  return { store, persistor }
}

export default configureStore
