import NProgress from '@lib/progress/progress';
import axios, { AxiosInstance } from 'axios';

const calculatePercentage = (loaded, total) => Math.floor(loaded * 1.0) / total;

export function loadProgressBar(config, instance: AxiosInstance = axios) {
  let requestsCounter = 0;

  const setupStartProgress = () => {
    instance.interceptors.request.use((cfg) => {
      requestsCounter++;
      NProgress.start();
      return cfg;
    });
  };

  const setupUpdateProgress = () => {
    const update = (e) => {
      NProgress.inc(calculatePercentage(e.loaded, e.total));
    };
    instance.defaults.onDownloadProgress = update;
    instance.defaults.onUploadProgress = update;
  };

  const setupStopProgress = () => {
    const responseFunc = (response) => {
      if (--requestsCounter === 0) {
        NProgress.done();
      }
      return response;
    };

    const errorFunc = (error) => {
      if (--requestsCounter === 0) {
        NProgress.done();
      }
      return Promise.reject(error);
    };

    instance.interceptors.response.use(responseFunc, errorFunc);
  };

  NProgress.configure(config);
  setupStartProgress();
  setupUpdateProgress();
  setupStopProgress();
}

const axiosInstance: AxiosInstance = axios.create();

// loadProgressBar({}, axiosInstance);

export default axiosInstance;
