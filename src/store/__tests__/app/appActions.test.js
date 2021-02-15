import * as actions from 'store/app/appAction';
import * as types from 'store/app/appActionTypes';

const ports = [
  {
    "code": "NOOSL",
    "name": "Oslo"
  },
  {
    "code": "CNSGH",
    "name": "Shanghai"
  },
  {
    "code": "CNSTG",
    "name": "Shantou"
  },
];

describe('appActions.test.js', () => {
  it('should create an action to set appLoader', () => {
    const loading = true;
    const action = {
      type: types.SET_APP_LOADER,
      payload: loading,
    };
    expect(actions.setAppLoader(loading)).toEqual(action);
  });

  it('should create an action to set ports list', () => {
    const action = {
      type: types.SET_PORTS_LIST,
      payload: ports,
    };
    expect(actions.setPortsList(ports)).toEqual(action);
  });
});