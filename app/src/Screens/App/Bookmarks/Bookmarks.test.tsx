import React from 'react'
import { renderWithRedux as render } from '@util/test/testRenderers'
import Bookmarks from './Bookmarks'

describe('<Bookmarks/>', () => {
  it('renders correctly', () => {
    render(<Bookmarks />)
  })

  it('displays message when there is no audios', () => {
    const { getByText } = render(<Bookmarks />)

    expect(getByText(/Lack of audios!/i))
  })

  test.todo('displays saved audios')

  test.todo('bookmarks tab button is highlighted')

  test.todo('switches to player when click')
})
