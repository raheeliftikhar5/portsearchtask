import {
  SET_APP_LOADER,
  SET_RATES_LOADER,
  SET_PORTS_LIST,
  SET_MAKET_RATES,
} from './appActionTypes';

const initialState = {
  appLoader: false,
  ratesLoader: false,
  portsList: [],
  marketRates: [],
};

const appReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_APP_LOADER: {
      return {
        ...state,
        appLoader: action.payload,
      };
    }
    case SET_RATES_LOADER: {
      return {
        ...state,
        ratesLoader: action.payload,
      };
    }
    case SET_PORTS_LIST: {
      return {
        ...state,
        portsList: action.payload,
      };
    }
    case SET_MAKET_RATES: {
      console.log('set rates', action.payload);
      return {
        ...state,
        marketRates: action.payload,
      };
    }
    default: {
      return state;
    }
  }
};

export default appReducer;
