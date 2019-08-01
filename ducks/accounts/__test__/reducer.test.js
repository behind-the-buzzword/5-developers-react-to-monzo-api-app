import reducer from "../reducer";
import {
  GET_ACCOUNTS_PENDING,
  GET_ACCOUNTS_SUCCESS,
  GET_ACCOUNTS_FAILURE,
} from "../types";

describe("reducer", () => {
  it("has a default state", () => {
    expect(reducer()).toStrictEqual({
      busy: false,
      items: [],
    });
  });

  it("handles GET_ACCOUNTS_PENDING", () => {
    const state = {};
    const action = {
      type: GET_ACCOUNTS_PENDING,
    };
    expect(reducer(state, action)).toStrictEqual({
      busy: true,
      items: [],
    });
  });

  it("handles GET_ACCOUNTS_SUCCESS", () => {
    const state = {};
    const action = {
      type: GET_ACCOUNTS_SUCCESS,
      payload: {
        accounts: [{
          id: "acc_00009237aqC8c5umZmrRdh",
          description: "Peter Pan's Account",
          created: "2015-11-13T12:17:42Z",
        }],
      },
    };
    expect(reducer(state, action)).toStrictEqual({
      busy: false,
      items: [{
        id: "acc_00009237aqC8c5umZmrRdh",
        description: "Peter Pan's Account",
        created: "2015-11-13T12:17:42Z",
      }],
    });
  });

  it("handles GET_ACCOUNTS_FAILURE", () => {
    const state = {};
    const action = {
      type: GET_ACCOUNTS_FAILURE,
      payload: {
        error: {
          code: "error.code",
          message: "Something went wrong",
        },
      },
    };
    expect(reducer(state, action)).toStrictEqual({
      busy: false,
      error: {
        code: "error.code",
        message: "Something went wrong",
      },
    });
  });
});
