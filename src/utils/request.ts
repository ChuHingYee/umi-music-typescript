import axios from 'axios';
import { message } from 'antd';
import { BASEURL } from '../config/index';

// create an axios instance
const service = axios.create({
  baseURL: BASEURL,
  timeout: 15000,
});

type error = {
  response: {
    message: string;
  };
};

type data = {
  [props: string]: any;
};

const err = (error: error) => {
  if (error.response) {
    message.error(error.response.message);
  } else {
    const errorStr = error + '';
    if (errorStr.indexOf('timeout') !== -1) {
      message.error('网络超时');
    } else {
      message.error('网络出错');
    }
  }
  return Promise.reject(error);
};

service.interceptors.request.use(config => {
  return config;
}, err);

service.interceptors.response.use(response => response, err);

function fetch(data: data) {
  return new Promise((resolve, reject) => {
    const config = { ...data };
    service(config).then(
      res => {
        const { data, status } = res;
        if (status === 200) {
          resolve(data);
        } else {
          message.error('请求失败~');
          reject(res);
        }
      },
      error => {
        reject(error);
      },
    );
  });
}

export default fetch;
