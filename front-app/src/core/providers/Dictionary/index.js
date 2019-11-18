import useInjectModals from 'core/utils/useInjectModals';
import DictionaryModal from './DictionaryModal';
import { MODAL_TYPES } from './constants';

const modals = [
  {
    type: MODAL_TYPES.DICTIONARY,
    component: DictionaryModal,
    title: 'Create New Entry',
    icon: 'book',
    size: 'tiny'
  }
];

export default function Applications() {
  useInjectModals(modals);
  return false;
}
