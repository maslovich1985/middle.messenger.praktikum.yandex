import HTTPTransport from '../common/HTTPTransport';

export interface IProfileData {
  first_name: 'string';
  second_name: 'string';
  display_name: 'string';
  login: 'string';
  email: 'string';
  phone: 'string';
}

export default class UserAPI {
  protected http: HTTPTransport;

  protected constructor() {
    this.http = new HTTPTransport('/user');
  }

  update(profile: IProfileData): Promise<string> {
    return this.http.put('/profile', profile);
  }
}
