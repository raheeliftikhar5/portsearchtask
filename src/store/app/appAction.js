import Util from 'services/Util';
import {
  SET_APP_LOADER,
  SET_RATES_LOADER,
  SET_PORTS_LIST,
  SET_MAKET_RATES,
} from './appActionTypes';

const utilService = new Util();

export const setAppLoader = (loader) => ({
  type: SET_APP_LOADER,
  payload: loader,
});

export const setRatesLoader = (loader) => ({
  type: SET_RATES_LOADER,
  payload: loader,
});

export const setPortsList = (portsList) => ({
  type: SET_PORTS_LIST,
  payload: portsList,
});

export const setMarketRates = (marketRates) => ({
  type: SET_MAKET_RATES,
  payload: marketRates,
});

const fetchPortsList = () => async (dispatch) => {
  dispatch(setAppLoader(true));

  try {
    let ports = await utilService.fetchPorts();
    ports = ports.map((port) => ({
      label: `${port.name} (${port.code})`,
      value: port.code,
    }));
    dispatch(setPortsList(ports));
  } catch (error) {
    console.error(error);
  } finally {
    dispatch(setAppLoader(false));
  }
};

const fetchMarketRates = (origin, destination) => async (dispatch) => {
  dispatch(setRatesLoader(true));

  try {
    const marketRates = await utilService.fetchMarketRates(origin, destination);
    dispatch(setMarketRates(marketRates));
  } catch (error) {
    dispatch(setMarketRates([]));
    console.error(error);
  } finally {
    dispatch(setRatesLoader(false));
  }
};

export {
  fetchPortsList,
  fetchMarketRates,
};
