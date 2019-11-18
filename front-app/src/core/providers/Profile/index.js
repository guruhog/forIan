import useInjectModals from 'core/utils/useInjectModals';
import { MODAL_TYPES } from './constants';
import ProfileModal from './modals/ProfileModal';

export default function Profile() {
  useInjectModals([
    {
      type: MODAL_TYPES.SHOW_PROFILE,
      component: ProfileModal,
      title: 'My Profile',
      icon: 'user circle',
      size: 'small'
    }
  ]);

  return false;
}
