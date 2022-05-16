
import axios, { AxiosError, AxiosRequestConfig, AxiosResponse } from 'axios';

import React from 'react';
import { axiosConfig } from '../constants/config';

export const axiosInstance = axios.create(axiosConfig);


export const useAxios = () => {

    const nextAuthAxiosInstance = React.useMemo(() => {
      
  
      const request = (config: AxiosRequestConfig) => {
        return config;
      };
  
      const response = (rsp: AxiosResponse) => {
        return rsp;
      };
      const error = (err: AxiosError) => {
        if (err.response) {
          switch (err.response.status) {
            case 400: {
              break;
            }
            default:
          }
          return Promise.reject(err);
        }
        return Promise.reject(err);
      };
      axiosInstance.interceptors.request.use(request, error);
      axiosInstance.interceptors.response.use(response, error);
      return axiosInstance;
    }, []);
  
    return nextAuthAxiosInstance;
  };