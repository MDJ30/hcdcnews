import styled from 'styled-components/native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';

export const Container = styled.View`
  flex: 1;
  background-color: #0a0a0a;
`;

export const Header = styled.View`
  padding: 20px;
  background-color: #1a1a2e;
  flex-direction: row;
  align-items: center;
  height: 40%;
  justify-content: space-between;
`;

export const ProfileInfo = styled.View`
  flex-direction: row;
  align-items: center;
`;

export const ProfileImage = styled.Image`
  width: 70px;
  height: 70px;
  border-radius: 35px;
  margin-right: 10px;
`;

export const UserInfo = styled.View`
  flex-direction: column;
`;

export const Username = styled.Text`
  font-size: 18px;
  color: white;
  font-weight: bold;
`;

export const Year = styled.Text`
  color: white;
`;

export const ManageProfileButton = styled.TouchableOpacity`
  background-color: #444;
  padding: 5px 10px;
  border-radius: 10px;
  margin-top: 5px;
`;

export const ManageProfileText = styled.Text`
  color: white;
  font-size: 14px;
`;

export const SettingsIcon = styled(Ionicons)`
  padding: 5px;
`;

export const GradientBackground = styled(LinearGradient)`
  flex: 1;
  padding: 20px;
`;

export const Grid = styled.View`
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: space-between;
`;

export const Card = styled.TouchableOpacity`
  width: 48%;
  background-color: rgba(255, 255, 255, 0.1);
  padding: 20px;
  border-radius: 15px;
  align-items: center;
  margin-bottom: 15px;
`;

export const CardText = styled.Text`
  color: white;
  margin-top: 10px;
  font-size: 14px;
`;

export const Icon = styled(Ionicons)``;
export const DropdownContainer = styled.View`
  position: absolute; /* Ensure the dropdown is positioned relative to its parent */
  top: 40px; /* Adjust this value to position the dropdown below the settings icon */
  right: 0px; /* Align to the right edge of the icon */
  background-color: #1c1c1e;
  padding: 10px;
  border-radius: 10px;
  z-index: 10; /* Ensure it appears above other elements */
  width: 170px; /* Explicitly define the width of the dropdown */
  elevation: 5; /* For Android shadow */
  shadow-color: #000; /* For iOS shadow */
  shadow-offset: 0px 2px;
  shadow-opacity: 0.25;
  shadow-radius: 3.84px;
`;
export const DropdownItem = styled.TouchableOpacity`
  flex-direction: row;
  align-items: center;
  padding: 10px 0;
`;

