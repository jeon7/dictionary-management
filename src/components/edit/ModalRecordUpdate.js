import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import Button from '../common/Button';

const Fullscreen = styled.div`
  position: fixed;
  z-index: 30;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.25);
  display: flex;
  justify-content: center;
  align-items: center;
`;

const ModalBlock = styled.div`
  width: 320px;
  background: white;
  padding: 1.5rem;
  border-radius: 4px;
  box-shadow: 0px 0px 8px rgba(0, 0, 0, 0.125);
  h2 {
    margin-top: 0;
    margin-bottom: 1rem;
  }
  p {
    margin-bottom: 3rem;
  }
  .buttons {
    display: flex;
    justify-content: flex-end;
  }
`;

const StyledButton = styled(Button)`
  height: 2rem;
  & + & {
    margin-left: 0.75rem;
  }
`;

const ModalRecordUpdate = ({
  visible,
  onConfirm,
  onCancel,
  children,
}) => {
  if (!visible) return null;
  return (
    <Fullscreen>
      <ModalBlock>
        <h2>Record Update</h2>
        {children}
        <div className="buttons">
          <StyledButton onClick={onCancel}>Cancel</StyledButton>
          <StyledButton cyan onClick={onConfirm}>Confirm</StyledButton>
        </div>
      </ModalBlock>
    </Fullscreen>
  );
};

ModalRecordUpdate.propTypes = {
  visible: PropTypes.bool.isRequired,
  onConfirm: PropTypes.func.isRequired,
  onCancle: PropTypes.func.isRequired,
};

export default ModalRecordUpdate;