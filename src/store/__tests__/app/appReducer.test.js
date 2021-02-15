import appReducer from 'store/app/appReducer';
import * as types from 'store/app/appActionTypes';

const initialState = {
  appLoader: false,
  ratesLoader: false,
  portsList: [],
  marketRates: [],
};

describe('appReducer.test.js', () => {
  it('should return initial state', () => {
    expect(appReducer(undefined, {})).toEqual(initialState)
  });

  it('should handle SET_APP_LOADER', () => {
    const action = {
      type: types.SET_APP_LOADER,
      payload: true,
    };

    expect(appReducer(initialState, action)).toEqual({
      appLoader: true,
      ratesLoader: false,
      portsList: [],
      marketRates: [],
    });
  });
});