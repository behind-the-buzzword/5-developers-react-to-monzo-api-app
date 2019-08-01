import React from "react";
import { View } from "react-native";
import { createStackNavigator, createAppContainer } from "react-navigation";
import { connect, Provider } from "react-redux";
import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import {
  createReduxContainer,
  createReactNavigationReduxMiddleware,
  createNavigationReducer,
} from "react-navigation-redux-helpers";
import { AppScreen, LoadingScreen, LoginScreen } from "./screens";
import * as reducers from "./reducers";

const RootNavigator = createStackNavigator({
  Loading: LoadingScreen,
  Login: LoginScreen,
  App: AppScreen,
});

const store = createStore(
  combineReducers({
    ...reducers,
    nav: createNavigationReducer(RootNavigator),
  }),
  applyMiddleware(
    thunk,
    createReactNavigationReduxMiddleware(state => state.nav),
  )
);

const AppContainer = createAppContainer(RootNavigator);
const AppNavigator = createReduxContainer(AppContainer);
const mapStateToProps = (state) => ({
  state: state.nav,
});
const AppWithNavigationState = connect(mapStateToProps)(AppNavigator);

const App = () => (
  <View style={{ flex: 1 }}>
    <Provider store={store}>
      <AppWithNavigationState />
    </Provider>
  </View>
);

export default App;

// export default class App extends Component {

//   render() {
//     return (
//       <Provider store={store}>
//         <Navigation />
//       </Provider>
//     );
//   }

// }
