import { AsyncStorage } from "react-native";
import { NavigationActions } from "react-navigation";
import {
  AUTHENTICATION_PENDING,
  AUTHENTICATION_SUCCESS,
  AUTHENTICATION_FAILURE,
  LOGGED_OUT,
} from "./types";

export const checkIsAuthenticated = () => async (dispatch) => {
  try {
    dispatch({ type: AUTHENTICATION_PENDING });

    const item = await AsyncStorage.getItem("user");
    const user = item && JSON.parse(item);

    if (!user) throw new Error("Not authenticated");

    dispatch({ type: AUTHENTICATION_SUCCESS, payload: { user } });
    dispatch(NavigationActions.navigate({
      routeName: "App",
    }));
  }
  catch (err) {
    dispatch({ type: AUTHENTICATION_FAILURE, payload: { error: err } });
    dispatch(NavigationActions.navigate({
      routeName: "Login",
    }));
  }
};

export const login = user => async dispatch => {
  dispatch({ type: AUTHENTICATION_PENDING });

  await AsyncStorage.setItem("user", JSON.stringify(user));

  dispatch({ type: AUTHENTICATION_SUCCESS, payload: { user } });
  dispatch(NavigationActions.navigate({
    routeName: "App",
  }));
};

export const logout = () => async dispatch => {
  await AsyncStorage.removeItem("user");

  dispatch({ type: LOGGED_OUT });
  dispatch(NavigationActions.navigate({
    routeName: "Login",
  }));
};
