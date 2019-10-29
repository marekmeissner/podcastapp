import React from 'react';
import {renderWithRedux as render} from '@util/test/testRenderers';
import Login from '../Login';

describe('<Login/>', () => {
  it('renders correctly', () => {
    render(<Login />);
  });
});
