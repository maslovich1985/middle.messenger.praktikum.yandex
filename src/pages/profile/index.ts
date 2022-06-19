import { withStore } from '../../common/Store';
import { ProfilePage } from './profile';

const withUser = withStore((state) => ({ ...state.currentUser }));

export default withUser(ProfilePage);
