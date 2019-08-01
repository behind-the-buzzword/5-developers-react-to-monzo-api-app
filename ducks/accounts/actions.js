import {
  MONZO_API_URL,
} from "react-native-dotenv";
import {
  GET_ACCOUNTS_PENDING,
  GET_ACCOUNTS_SUCCESS,
  GET_ACCOUNTS_FAILURE,
} from "./types";

export const getAccounts = () => async (dispatch, getState) => {
  try {
    dispatch({ type: GET_ACCOUNTS_PENDING });

    const state = await getState();
    const token = state.auth.user.access_token;
    const response = await fetch(`${MONZO_API_URL}/accounts`, {
      method: "GET",
      headers: {
        "Authorization": `Bearer ${token}`,
        "Accept": "application/json",
      },
    });
    const body = await response.json();

    if (body.code === "bad_request.invalid_token") {
      throw body;
    }

    dispatch({
      type: GET_ACCOUNTS_SUCCESS,
      payload: {
        accounts: body.accounts,
      },
    });
  }
  catch (err) {
    dispatch({
      type: GET_ACCOUNTS_FAILURE,
      payload: {
        error: err,
      },
    });
  }
};
