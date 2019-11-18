import modals from './modals';
import useInjectModals from 'core/utils/useInjectModals';

export default function Applications() {
  useInjectModals(modals);
  return false;
}
