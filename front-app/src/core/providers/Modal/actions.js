import { HIDE_MODAL, SHOW_MODAL } from './constants';

export const showModal = (type, props) => {
  return { type: SHOW_MODAL, payload: { type, props } };
};

export const closeModal = () => {
  return { type: HIDE_MODAL };
};
