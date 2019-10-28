import React from 'react';
import {connect} from 'react-redux';
import {RootState} from '../../redux/rootState';
import {selectUser} from '../Auth/authReducer';
import {Text} from 'native-base';
import InputError from '../../components/InputError/InputError';
import {User} from '../Auth/types';

interface Props {
  user: User;
}

class Home extends React.Component<Props> {
  render() {
    return <InputError>Dashboard</InputError>;
  }
}

export default connect((state: RootState) => ({user: selectUser(state)}))(Home);
