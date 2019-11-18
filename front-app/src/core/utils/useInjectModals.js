import { useEffect, useContext } from 'react';
import ModalContext from 'core/providers/Modal/Context';

export default function useInjectModals(modalArrays) {
  const context = useContext(ModalContext);

  useEffect(() => {
    context.addModalTypes(modalArrays);
  }, [context, modalArrays]);
}
