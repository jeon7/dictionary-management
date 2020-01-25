import React from 'react';
import ModalConfirm from '../common/ModalConfirm';

const ModalDictionaryDelete = ({ visible, onConfirm, onCancel }) => {
  return (
    <ModalConfirm
      visible={visible}
      title="Dictionary Delete"
      description="Are you sure to delete this dictionary?"
      confirmText="Delete"
      onConfirm={onConfirm}
      onCancel={onCancel}
    />
  );
};

export default ModalDictionaryDelete;