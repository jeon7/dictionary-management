import React from 'react';
import ModalAsk from '../common/ModalAsk';


const ModalDictionaryDelete = ({
  visible,
  onConfirm,
  onCancel,
}) => {
  if (!visible) return null;
  return (
    <ModalAsk
      visible={visible}
      title="Dictionary Delete"
      description="Are you sure to delete this dictionary?"
      onConfirm={onConfirm}
      onCancel={onCancel}
    />
  );
};

export default ModalDictionaryDelete;
