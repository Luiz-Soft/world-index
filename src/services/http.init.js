import axios from "axios";
import { BASE_URL } from "@/configs";

export default class Http {
  static instance;

  constructor() {
    Http.instance = axios.create({
      //a instancia axios eh criada
      baseURL: BASE_URL, //passando baseUrl como parametro
    });

    return Http.instance; //e retornando a nova instancia
  }

  static singleton() {
    //isso aqui garante que o http instance so eh criada caso ja nao exista
    if (!Http.instance) {
      return new Http();
    }
    return Http.instance;
  }
}
