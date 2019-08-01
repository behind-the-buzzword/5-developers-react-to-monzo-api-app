import {
  AUTHENTICATION_PENDING,
  AUTHENTICATION_SUCCESS,
  AUTHENTICATION_FAILURE,
  LOGGED_OUT,
} from "./types";

const initialState = {
  busy: false,
  user: null,
};

export default function reducer(state = initialState, { type, payload } = {}) {
  switch (type) {
    case AUTHENTICATION_PENDING:
      return { ...state, busy: true, user: null };

    case AUTHENTICATION_SUCCESS:
      return { ...state, busy: false, user: payload.user };

    case AUTHENTICATION_FAILURE:
      return { ...state, busy: false, error: payload.error };

    case LOGGED_OUT:
      return initialState;

    default:
      return state;
  }
}
