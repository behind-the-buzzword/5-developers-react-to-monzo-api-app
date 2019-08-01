import {
  GET_ACCOUNTS_PENDING,
  GET_ACCOUNTS_SUCCESS,
  GET_ACCOUNTS_FAILURE,
} from "./types";

const initialState = {
  busy: false,
  items: [],
};

export default function reducer(state = initialState, { type, payload } = {}) {
  switch (type) {
    case GET_ACCOUNTS_PENDING:
      return { ...state, busy: true, items: [] };

    case GET_ACCOUNTS_SUCCESS:
      return { ...state, busy: false, items: payload.accounts };

    case GET_ACCOUNTS_FAILURE:
      return { ...state, busy: false, error: payload.error };

    default:
      return state;
  }
}
