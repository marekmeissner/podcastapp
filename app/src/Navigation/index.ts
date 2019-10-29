import {createAppContainer} from 'react-navigation';

import RootNavigator from './Navigators/root';

const AppNavigation = createAppContainer(RootNavigator);

export default AppNavigation;
