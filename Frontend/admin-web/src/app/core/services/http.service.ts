import { Injectable } from '@angular/core';
import axios, { AxiosRequestHeaders } from 'axios';
import { httpMethods } from '../enums';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})

export class HttpService {
  
  method: httpMethods;

  url: string;

  token: string;

  access_token: string | undefined;

  data: Object;

  responseType: any

  constructor() {
    this.method = httpMethods.get;
    this.url = '';
    this.token = '';
    this.data = {};
  }

  setUrl(url: string) {
    this.url = url;
    return this;
  }

  setData(data: Object) {
    this.data = data;
    return this;
  }

  setResponseType(type: any) {
    this.responseType = type;
    return this;
  }

  // set bearer token header
  setToken(token: string) {
    this.token = `Bearer ${token}`;
    return this;
  }

  setMethod(method: httpMethods) {
    this.method = method;
    return this;
  }

  private unsetData() {
    this.data = [];
    return this;
  }

  async request() : Promise<any> {
    try {
      let url = environment.apiUrl + '/' + this.url;
      if (this.method === httpMethods.get) url += this.serializeParams(this.data);

      const headers: AxiosRequestHeaders = {
        'Content-Type': 'application/json',
      };

      if (typeof this.token !== undefined) {
        headers.Authorization = this.token;
      }

      const config = {
        url,
        method: this.method,
        data: JSON.stringify(this.data) || {},
      };

      const instance = axios.create({
        headers: headers,
        responseType: this.responseType
      })

      instance.interceptors.response.use(
          (res) => {
            return res;
          },
          async (err : any) => {
            const originalConfig = err.config;
            // const history = useHistory();
            // if (originalConfig.url !== "/login" && err.response) {
            //   // Access Token was expired
            //   if (err.response.status === 401) {
            //     localStorage.clear();
            //     sessionStorage.clear();
            //     return window.location.href = "/login"
            //   }
            // }

            return Promise.reject(err);
          }
      )

      const response = await instance(config);

      this.unsetData();

      return response;
    } catch ({ response }) {
      this.unsetData();
     // return response;
      throw response;
    }
  }

  // eslint-disable-next-line class-methods-use-this
  private serializeParams(params: any) {
    if (typeof params === undefined || Object.keys(params).length <= 0) return '';

    let queryString = '';
    // eslint-disable-next-line guard-for-in
    for (const key in params) {
      if (queryString !== '') queryString += '&';
      queryString += `${key}=${encodeURIComponent(params[key])}`;
    }
    console.log(`?${queryString}`);
    return `?${queryString}`;
  }
}

// export default new HttpService();