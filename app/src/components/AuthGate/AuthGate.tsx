import React from 'react';
import {connect} from 'react-redux';
import {selectUser} from '../../screens/Auth/authReducer';
import {User} from '../../screens/Auth/types';
import {RootState} from '../../redux/rootState';
import NavigatorService from '../../helpers/navigationService';

interface Props {
  children: React.ReactNode | React.ReactNodeArray;
  fallback: string;
  authPath: string;
  user?: User;
}

class AuthGate extends React.Component<Props> {
  componentDidMount() {
    if (this.props.user.uid) {
      NavigatorService.navigate(this.props.authPath);
    } else {
      NavigatorService.navigate(this.props.fallback);
    }
  }
  render() {
    return <React.Fragment>{this.props.children}</React.Fragment>;
  }
}

export default connect((state: RootState) => ({user: selectUser(state)}))(
  AuthGate,
);
