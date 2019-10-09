import React from 'react';
import {Login} from '../Login';
import {cleanup, render} from '@testing-library/react';

describe('<Login/>', () => {
  afterEach(cleanup);

  it('renders correctly', () => {
    render(<Login />);
  });
});
