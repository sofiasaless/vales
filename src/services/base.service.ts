import { api } from "../config/client";

export abstract class BaseService {
  protected BASE_PATH: string = "";

  constructor(subpath?: string) {
    if (subpath) this.BASE_PATH += `/${subpath}`;
  }

  protected async criar(body: any, subpath?: string[]) {
    return await api.post(this.buildUrl(subpath), body);
  }

  protected buildUrl(url?: string[]) {
    return `/${this.BASE_PATH}/${url?.join('/')}`;
  }
}
