import React from 'react'
import { renderWithRedux as render } from '@util/test/testRenderers'
import { fireEvent, wait } from '@testing-library/react-native'
import Login from './Login'
import { SCREEN_NAMES } from '@navigation/constants'

describe('<Login/>', () => {
  const getProps = (navigate?: Function) => ({
    navigation: {
      navigate,
    },
  })

  it('renders correctly', () => {
    render(<Login />)
  })

  it('validates fields correctly', async () => {
    const { getByTestId, getByText, getAllByText } = render(<Login />)

    fireEvent.press(getByTestId('submit'))

    await wait(() => {
      expect(getAllByText(/Required/i)).toHaveLength(2)
    })

    fireEvent.changeText(getByTestId('email'), { target: { value: 'marek@' } })
    fireEvent.press(getByTestId('submit'))

    await wait(() => {
      expect(getByText(/Email address provided is invalid/i))
    })
  })

  it('switches to sign up page', async () => {
    const navigate = jest.fn()

    const { getByTestId } = render(<Login {...getProps(navigate)} />)

    fireEvent.press(getByTestId('register'))

    await wait(() => {
      expect(navigate).toBeCalledWith(SCREEN_NAMES.AUTH_REGISTER)
    })
  })

  it('switches to forgot password page', async () => {
    const navigate = jest.fn()

    const { getByTestId } = render(<Login {...getProps(navigate)} />)

    fireEvent.press(getByTestId('forgotPassword'))

    await wait(() => {
      expect(navigate).toBeCalledWith(SCREEN_NAMES.AUTH_FORGOT_PASSWORD)
    })
  })
})
