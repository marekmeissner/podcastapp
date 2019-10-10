import {
  NavigationActions,
  NavigationParams,
  NavigationContainerComponent,
} from 'react-navigation';

let _container: NavigationContainerComponent;

const setContainer = (container: NavigationContainerComponent) => {
  _container = container;
};

const navigate = (routeName: string, params?: NavigationParams) => {
  _container.dispatch(
    NavigationActions.navigate({
      routeName,
      params,
    }),
  );
};

export default {
  setContainer,
  navigate,
};
