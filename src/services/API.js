import axios from 'axios';

class API {
  constructor() {
    this.baseUrl = 'https://685rp9jkj1.execute-api.eu-west-1.amazonaws.com/prod';

    axios.defaults.headers['x-api-key'] = 'r4Z34rdk6146vTu9LnpxS2soFBULAkdH98WlTFoZ';
    axios.interceptors.response.use(
      (resp) => resp.data,
      (error) => Promise.reject(error),
    );
  }

  get(endpoint, params = null) {
    return axios.get(`${this.baseUrl}/${endpoint}`, params);
  }

  post(endpoint, data) {
    return axios.post(`${this.baseUrl}/${endpoint}`, data);
  }

  put(endpoint, resourceId, data) {
    return axios.put(`${this.baseUrl}/${endpoint}/${resourceId}`, data);
  }

  delete(endpoint, resourceId) {
    return axios.delete(`${this.baseUrl}/${endpoint}/${resourceId}`);
  }
}

export default API;
