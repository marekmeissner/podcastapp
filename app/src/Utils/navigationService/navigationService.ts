import { NavigationActions, NavigationContainerComponent } from 'react-navigation'

let navigator: NavigationContainerComponent | null = null

function setTopLevelNavigator(navigatorRef: NavigationContainerComponent) {
  navigator = navigatorRef
}

function navigate(routeName: string, params?: object) {
  if (navigator) {
    navigator.dispatch(
      NavigationActions.navigate({
        routeName,
        params,
      }),
    )
  }
}

export default {
  navigate,
  setTopLevelNavigator,
}
