import React from 'react'
import { renderWithRedux as render } from '@util/index'
import Login from '../Login'

describe('<Login/>', () => {
  it('renders correctly', () => {
    render(<Login />)
  })
})
