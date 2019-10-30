import React from 'react'
import { renderWithRedux as render } from '@util/index'
import Register from '../Register'

describe('<Login/>', () => {
  it('renders correctly', () => {
    render(<Register />)
  })
})
