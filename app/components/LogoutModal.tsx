
import React from 'react';
import { Modal, Text } from 'react-native';
import styled from 'styled-components/native';

interface LogoutModalProps {
  visible: boolean;
  onClose: () => void;
  onConfirm: () => void;
}

const LogoutModal: React.FC<LogoutModalProps> = ({ visible, onClose, onConfirm }) => {
  return (
    <Modal
      transparent={true}
      visible={visible}
      animationType="fade"
      onRequestClose={onClose}
    >
      <ModalOverlay>
        <ModalContainer>
          <ModalTitle>Confirm Logout</ModalTitle>
          <ModalMessage>Are you sure you want to log out?</ModalMessage>
          <ModalButtons>
            <CancelButton onPress={onClose}>
              <CancelButtonText>Cancel</CancelButtonText>
            </CancelButton>
            <ConfirmButton onPress={onConfirm}>
              <ConfirmButtonText>Logout</ConfirmButtonText>
            </ConfirmButton>
          </ModalButtons>
        </ModalContainer>
      </ModalOverlay>
    </Modal>
  );
};

export default LogoutModal;

// Styled-components
const ModalOverlay = styled.View`
  flex: 1;
  background-color: rgba(0, 0, 0, 0.5);
  justify-content: center;
  align-items: center;
`;

const ModalContainer = styled.View`
  background-color: white;
  padding: 20px;
  border-radius: 10px;
  width: 80%;
  align-items: center;
`;

const ModalTitle = styled.Text`
  font-size: 18px;
  font-weight: bold;
  margin-bottom: 10px;
`;

const ModalMessage = styled.Text`
  font-size: 16px;
  text-align: center;
  margin-bottom: 20px;
`;

const ModalButtons = styled.View`
  flex-direction: row;
  justify-content: space-between;
  width: 100%;
`;

const CancelButton = styled.TouchableOpacity`
  background-color: #ccc;
  padding: 10px;
  border-radius: 5px;
  flex: 1;
  margin-right: 10px;
  align-items: center;
`;

const ConfirmButton = styled.TouchableOpacity`
  background-color: #d80027;
  padding: 10px;
  border-radius: 5px;
  flex: 1;
  margin-left: 10px;
  align-items: center;
`;

const CancelButtonText = styled.Text`
  color: #000;
  font-weight: bold;
`;

const ConfirmButtonText = styled.Text`
  color: #fff;
  font-weight: bold;
`;