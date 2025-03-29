import styled from 'styled-components/native';
import { BlurView } from 'expo-blur'; // Import BlurView for the blur effect

export const BlurredContainer = styled(BlurView)`
  width: 90%;
  background-color: rgba(5, 5, 5, 0.49); /* Transparent background */
  padding: 20px;
  border-radius: 10px;
  align-items: center;
  
  
`;

export const Container = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
  padding: 16px;
  
`;

export const Title = styled.Text`
  font-size: 20px;
  font-weight: bold;
  color: rgb(245, 245, 245);
  text-align: center;
  margin-bottom: 16px;
`;

export const Card = styled.View`
  width: 90%;
  background-color: rgba(255, 255, 255, 0.9);
  padding: 20px;
  border-radius: 10px;
  align-items: center;
  shadow-color: #000;
  shadow-opacity: 0.2;
  shadow-radius: 4px;
  elevation: 5;
`;

export const Input = styled.TextInput`
  width: 100%;
  height: 45px;
  border-radius: 25px;
  border: 1px solid gray;
  padding: 10px;
  margin-bottom: 10px;
  background-color: rgba(85, 78, 78, 0.57); /* Add opacity to the background */
  opacity: 0.9; /* Adjust the overall opacity of the input */
  color: white; /* Set the text color to white */
`;

export const LoginButton = styled.TouchableOpacity`
  width: 100%;
  background-color: #007bff;
  padding: 12px;
  border-radius: 25px;
  align-items: center;
  margin-top: 10px;
`;

export const ButtonText = styled.Text`
  color: white;
  font-weight: bold;
  font-size: 16px;
`;

export const SignupButton = styled.TouchableOpacity`
  margin-top: 10px;
  padding: 12px;
  width: 100%;
  background-color: rgb(0, 0, 0);
  border-radius: 25px;
  align-items: center;
  border: 1px solid #007bff;
`;

export const GoogleButton = styled.TouchableOpacity`
  margin-top: 20px;
  background-color: transparent;
  padding: 8px;
  border-radius: 25px;
`;

export const GoogleIcon = styled.Image`
  width: 30px;
  height: 30px;
`;