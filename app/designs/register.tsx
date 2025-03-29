import styled from 'styled-components/native';

export const Container = styled.View`
  flex: 1;
  justify-content: center;
  padding: 16px;
  background-color: #f5f5f5;
`;

export const Title = styled.Text`
  font-size: 24px;
  font-weight: bold;
  margin-bottom: 16px;
  text-align: center;
  color: #333;
`;

export const Input = styled.TextInput`
  height: 40px;
  border: 1px solid gray;
  margin-bottom: 12px;
  padding: 8px;
  border-radius: 4px;
  background-color: #fff;
`;

export const LoginButton = styled.TouchableOpacity`
  background-color: #007bff;
  padding: 12px;
  border-radius: 4px;
  align-items: center;
`;

export const ButtonText = styled.Text`
  color: white;
  font-weight: bold;
  font-size: 16px;
`;

export const LinkText = styled.Text`
  margin-top: 16px;
  text-align: center;
  color: #007bff;
  text-decoration: underline;
`;