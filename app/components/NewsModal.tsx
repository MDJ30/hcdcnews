import React from 'react';
import { Modal, TouchableWithoutFeedback } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import styled from 'styled-components/native';

interface NewsModalProps {
  visible: boolean;
  news: { title: string; description: string; image: any } | null;
  onClose: () => void;
  onSeeMore: () => void;
}

const NewsModal = ({ visible, news, onClose, onSeeMore }: NewsModalProps) => {
  const handleSeeMore = async () => {
    if (news) {
      try {
        // Store the news details in AsyncStorage
        await AsyncStorage.setItem('selectedNews', JSON.stringify(news));
        // Trigger the onSeeMore callback to navigate to the NewsDetails screen
        onSeeMore();
      } catch (error) {
        console.error('Error saving news to local storage:', error);
      }
    }
  };

  if (!news) {
    return null; // Return nothing if news is null or undefined
  }

  return (
    <Modal
      visible={visible}
      transparent
      animationType="slide"
      onRequestClose={onClose} // Handles back button press on Android
    >
      <TouchableWithoutFeedback onPress={onClose}>
        <Overlay>
          <TouchableWithoutFeedback>
            <ModalContainer>
              {news.image && <NewsImage source={news.image} resizeMode="cover" />}
              <ModalTitle>{news.title}</ModalTitle>
              <ModalDescription>{news.description}</ModalDescription>
              <ButtonContainer>
                <SeeMoreText onPress={handleSeeMore}>See More...</SeeMoreText>
              </ButtonContainer>
            </ModalContainer>
          </TouchableWithoutFeedback>
        </Overlay>
      </TouchableWithoutFeedback>
    </Modal>
  );
};

export default NewsModal;

// Styled components
const Overlay = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
  background-color: rgba(0, 0, 0, 0.5);
`;

const ModalContainer = styled.View`
  width: 90%;
  background-color: white;
  border-radius: 10px;
  overflow: hidden; /* Ensures the image stays within the rounded corners */
  align-items: center;
`;

const NewsImage = styled.Image`
  width: 100%;
  height: 200px;
`;

const ModalTitle = styled.Text`
  font-size: 18px;
  font-weight: bold;
  margin: 10px 0;
  text-align: center;
`;

const ModalDescription = styled.Text`
  font-size: 14px;
  margin-bottom: 20px;
  text-align: center;
  padding: 0 10px;
`;

const ButtonContainer = styled.View`
  width: 100%;
  margin-top: 10px;
  padding: 0 20px;
  align-items: center;
`;

const SeeMoreText = styled.Text`
  font-size: 16px;
  color: blue;
  margin-bottom: 10px;
  text-decoration: underline;
`;