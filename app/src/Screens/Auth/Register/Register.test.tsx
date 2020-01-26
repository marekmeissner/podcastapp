import React from 'react'
import { renderWithRedux as render } from '@util/test/testRenderers'
import { fireEvent, wait } from '@testing-library/react-native'
import { Register } from './Register'
import { SCREEN_NAMES } from '@navigation/constants'
import { mockUser } from '../__mocks__/mockUser'

describe('<Register />', () => {
  const getProps = (props?: any) => ({
    ...props,
  })

  it('renders correctly', () => {
    render(<Register {...getProps()} />)
  })

  it('validates fields correctly', async () => {
    const { getByTestId, getByText, getAllByText } = render(<Register {...getProps()} />)

    fireEvent.press(getByTestId('submit'))

    await wait(() => {
      expect(getAllByText(/Required/i)).toHaveLength(4)
    })

    fireEvent.changeText(getByTestId('name'), { target: { value: 'I am longer than thirty characters' } })
    fireEvent.changeText(getByTestId('email'), { target: { value: 'marek@' } })
    fireEvent.changeText(getByTestId('password'), { target: { value: 'pass' } })

    fireEvent.press(getByTestId('submit'))

    await wait(() => {
      expect(getByText('Must be at most 30 characters')).toBeDefined()
      expect(getByText('Email address provided is invalid')).toBeDefined()
      expect(getByText('Password should have at least 1 uppercase & number')).toBeDefined()
    })

    fireEvent.changeText(getByTestId('password'), { target: { value: 'pass' } })
    fireEvent.changeText(getByTestId('passwordRepeat'), { target: { value: 'psst' } })

    fireEvent.press(getByTestId('submit'))

    await wait(() => {
      expect(getByText('Passwords must match')).toBeDefined()
    })
  })

  it('switches to sign in page', async () => {
    const navigate = jest.fn()

    const { getByTestId } = render(<Register {...getProps({ navigation: { navigate } })} />)

    fireEvent.press(getByTestId('signIn'))

    await wait(() => {
      expect(navigate).toBeCalledWith(SCREEN_NAMES.AUTH_LOGIN)
    })
  })

  it('should register user and redirect to tabs navigation', async () => {
    const registerUser = jest.fn(),
      navigate = jest.fn()
    const { getByTestId, getByText, getAllByText } = render(
      <Register {...getProps({ navigation: { navigate }, registerUser })} />,
    )

    registerUser.mockReturnValue(true)
    const password = 'Password1'

    fireEvent.changeText(getByTestId('name'), { target: { value: mockUser.accountName } })
    fireEvent.changeText(getByTestId('email'), { target: { value: mockUser.email } })
    fireEvent.changeText(getByTestId('password'), { target: { value: password } })
    fireEvent.changeText(getByTestId('passwordRepeat'), { target: { value: password } })
    fireEvent.press(getByTestId('submit'))

    await wait(() => {
      expect(registerUser).toBeCalledTimes(1)
      expect(registerUser).toBeCalledWith({
        email: mockUser.email,
        name: mockUser.accountName,
        password,
        passwordRepeat: password,
      })
      expect(navigate).toBeCalledWith(SCREEN_NAMES.APP_TABS)
    })
  })
})
