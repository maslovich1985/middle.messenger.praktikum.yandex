import UserAPI, { IProfileData } from '../api/UserAPI';

class UserController {
  private api: UserAPI;

  constructor() {
    this.api = new UserAPI();
  }

  async updateProfile(profile: IProfileData) {
    await this.api.update(profile);
  }
}

export default new UserController();
