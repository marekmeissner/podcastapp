import React from 'react'
import { renderWithRedux as render } from '@util/test/testRenderers'
import Home from './Home'

describe('<Home/>', () => {
  it('renders correctly', () => {
    render(<Home />)
  })

  it('displays message when there is not audios', () => {
    const { getByText } = render(<Home />)

    expect(getByText(/You're not following anyone, search for audios!/i))
  })

  test.todo('displays audios')

  test.todo('home tab button is highlighted')

  test.todo('displays all necessary information on audio tile')

  test.todo('switches to player when click')

  test.todo('displays user avatar in header')
})
