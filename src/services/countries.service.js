import BaseService from "./base.service";

export default class UserService extends BaseService {
  static async getCountryByName(name) {
    return new Promise((resolve, reject) => {
      this.request()
        .get(`name/${name}`)
        .then((response) => {
          resolve(response);
        })
        .catch((error) => {
          reject(error.response);
        });
    });
  }
  static async getCountryByRegion(region) {
    return new Promise((resolve, reject) => {
      this.request()
        .get(`region/${region}`)
        .then((response) => {
          resolve(response);
        })
        .catch((error) => {
          reject(error.response);
        });
    });
  }
  static async getCountryByCode(code) {
    return new Promise((resolve, reject) => {
      this.request()
        .get(`alpha/${code}`)
        .then((response) => {
          resolve(response);
        })
        .catch((error) => {
          reject(error.response);
        });
    });
  }
  static async getAllCountries() {
    return new Promise((resolve, reject) => {
      this.request()
        .get(`all/`)
        .then((response) => {
          resolve(response);
        })
        .catch((error) => {
          reject(error.response);
        });
    });
  }
}
