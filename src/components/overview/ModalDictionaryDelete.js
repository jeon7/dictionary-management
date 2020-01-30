import React from 'react';
import PropTypes from 'prop-types';
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

ModalDictionaryDelete.propTypes = {
  visible: PropTypes.bool.isRequired,
  onConfirm: PropTypes.func.isRequired,
  onCancle: PropTypes.func.isRequired,
};

export default ModalDictionaryDelete;
