import React from 'react';
import { connect } from 'react-redux';

// Modals
import LoginModal from '../modals/LoginModal';
import RegisterModal from '../modals/RegisterModal';
import TestModal from '../modals/TestModal';

const modalLookUp = {
  LoginModal,
  RegisterModal,
  TestModal
};

const ModalManager = ({ activeModal }) => {
  let renderModal;

  if (activeModal) {
    const { modalType, modalProps } = activeModal;
    const ModalComponent = modalLookUp[modalType];

    renderModal = <ModalComponent {...modalProps} />;
  }

  return <span>{renderModal}</span>;
}

const mapStateToProps = state => ({
  activeModal: state.modals
});

export default connect(mapStateToProps, null)(ModalManager);
