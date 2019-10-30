import React, { ReactNode } from 'react'
import { applyMiddleware, compose, createStore } from 'redux'
import { Provider } from 'react-redux'
import { render } from '@testing-library/react-native'
import { rootReducer, RootState, initialRootState } from '@service/rootReducer'
import thunk from 'redux-thunk'

export const renderWithRedux = (
  ui: ReactNode,
  {
    initialState,
    store = createStore(
      rootReducer,
      {
        ...initialRootState,
        ...initialState,
      },
      compose(applyMiddleware(thunk)),
    ),
  }: { initialState?: Partial<RootState>; store?: any } = {},
) => {
  return {
    ...render(<Provider store={store}>{ui}</Provider>),
    // adding `store` to the returned utilities to allow us
    // to reference it in our tests (just try to avoid using
    // this to test implementation details).
    store: store,
  }
}
