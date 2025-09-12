import axios, {AxiosInstance} from 'axios';
import {Platform} from 'react-native';
// import {getObject, setObject, StorageKey} from '~/utils/StorageHelper';
import {Logger} from '~/shared/lib';
import Config from 'react-native-config';

const instance: AxiosInstance = axios.create({
  baseURL: Config.BASE_URL,
  timeout: 60000,
  withCredentials: true,
  headers: {
    'User-Agent': `${Platform.select({ios: 'iphone', android: 'android'})}`,
  },
});

// request
instance.interceptors.request.use(
  async function (config) {
    Logger.debug('🫡interceptors request', config.url);
    // const token = await getObject(StorageKey.ACCESS_TOKEN);
    // if (token) {
    //   config.headers['Authorization-jwt'] = `Bearer ${token}`;
    // }

    return config;
  },
  function (error) {
    Logger.debug('❌interceptors request error', error);
    return Promise.reject(error);
  },
);

// response
instance.interceptors.response.use(
  function (response) {
    Logger.debug('👀interceptors response.status', response.status);
    // data 내용이 긴 api 제외하고 로그 출력.
    if (
      response.config.url != '/api/codes/fin/normal'
    ) {
      Logger.debug('🛜interceptors response.data', response.data);
    } else {
      // console.debug(
      //   `interceptors\nstatus = ${response.data.status}\n`,
      //   `error =  ${JSON.stringify(response.data.error, null, 2)}`,
      // );
    }

    // if (response.headers['access-token']) {
    //   setObject(StorageKey.ACCESS_TOKEN, response.headers['access-token']);
    // }
    // if (response.headers['refresh-token']) {
    //   setObject(StorageKey.REFRESH_TOKEN, response.headers['refresh-token']);
    // }

    return response;
  },
  async function (error) {
    Logger.debug(
      'interceptors response status:',
      error.response.status,
    );
    Logger.debug('interceptors response error:', error.response.data);

    if (error.response) {
      if (error.response.status === 503) {
        return Promise.reject({
          message: `현재 접속이 원활하게 이루어지지 않고있습니다. 이용에 불편을 드려 죄송합니다.`,
        });
      }

      if (error.response.data.status === 'Failed') {
        return Promise.reject(error.response.data.error);
      }
    }

    return Promise.reject(error);
  },
);

export default instance;
