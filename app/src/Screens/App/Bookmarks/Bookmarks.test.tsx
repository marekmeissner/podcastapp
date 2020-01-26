import React from 'react'
import { renderWithRedux as render } from '@util/test/testRenderers'
import Bookmarks from './Bookmarks'

describe('<Bookmarks/>', () => {
  const getProps = (props?: any) => ({
    ...props,
  })

  it('renders correctly', () => {
    render(<Bookmarks {...getProps()} />)
  })

  it('displays message when there is no audios', () => {
    const { getByText } = render(<Bookmarks {...getProps()} />)

    expect(getByText(/Lack of audios!/i))
  })

  test.todo('displays saved audios')

  test.todo('bookmarks tab button is highlighted')

  test.todo('switches to player when click')
})
