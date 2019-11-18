import useInjectModals from 'core/utils/useInjectModals';
import { SHOW_MESSAGES } from './constants';
import MessagesModal from './modals/MessagesModal';

export default function Messages() {
  useInjectModals([
    {
      type: SHOW_MESSAGES,
      component: MessagesModal,
      title: 'Messages',
      icon: 'comments outline',
      size: 'fullscreen'
    }
  ]);

  return false;
}
