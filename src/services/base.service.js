import Http from "./http.init";

export default class BaseService {
  static request() {
    //aqui o metodo request eh criado e retorna o singleton como parametro.
    return Http.singleton(); //Esse eh o request que
  }
}
