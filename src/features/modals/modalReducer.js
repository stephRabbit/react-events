import { createReducer } from '../../app/common/util/reducerUtil';
import { MODAL_CLOSE, MODAL_OPEN } from './modalConstants';

const initState = null;

export const closeModal = (state, payload) => {
  return null;
}

export const openModal = (state, payload) => {
  const { modalType, modalProps } = payload;
  return { modalType, modalProps };
}

export default createReducer(
  initState,
  {
    [MODAL_CLOSE]: closeModal,
    [MODAL_OPEN]: openModal
  }
);
