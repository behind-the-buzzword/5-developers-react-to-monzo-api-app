import reducer from "../reducer";
import {
  AUTHENTICATION_PENDING,
  AUTHENTICATION_SUCCESS,
  AUTHENTICATION_FAILURE,
} from "../types";

describe("reducer", () => {
  it("has a default state", () => {
    expect(reducer()).toStrictEqual({
      busy: false,
      user: null,
    });
  });

  it("handles AUTHENTICATION_PENDING", () => {
    const state = {};
    const action = {
      type: AUTHENTICATION_PENDING,
    };
    expect(reducer(state, action)).toStrictEqual({
      busy: true,
      user: null,
    });
  });

  it("handles AUTHENTICATION_SUCCESS", () => {
    const state = {};
    const action = {
      type: AUTHENTICATION_SUCCESS,
      payload: {
        user: {
          id: 1,
          username: "test-user",
        },
      },
    };
    expect(reducer(state, action)).toStrictEqual({
      busy: false,
      user: {
        id: 1,
        username: "test-user",
      },
    });
  });

  it("handles AUTHENTICATION_FAILURE", () => {
    const state = {};
    const action = {
      type: AUTHENTICATION_FAILURE,
      payload: {
        error: {
          message: "Something went wrong",
        },
      },
    };
    expect(reducer(state, action)).toStrictEqual({
      busy: false,
      error: {
        message: "Something went wrong",
      },
    });
  });
});
