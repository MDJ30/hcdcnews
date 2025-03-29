// filepath: c:\Users\jelma\hcdcupdates\app\dashboard\designIndex.ts
import styled from 'styled-components/native';
import { Dimensions } from 'react-native';

const { width, height } = Dimensions.get('window');

export const Container = styled.View`
  flex: 1;
  background-color: #0a0a0a;
  padding: ${height * 0.02}px;
`;

export const Header = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

export const Title = styled.Text`
  font-size: ${width * 0.05}px;
  font-weight: bold;
  color: white;
`;

export const SearchBar = styled.View`
  background-color: #1c1c1e;
  padding: ${height * 0.01}px;
  border-radius: ${width * 0.05}px;
  flex-direction: row;
  align-items: center;
  width: ${width * 0.1}px;
  justify-content: center;
`;

export const SectionTitle = styled.Text`
  font-size: ${width * 0.045}px;
  color: white;
  margin-top: ${height * 0.02}px;
  font-weight: bold;
`;

export const NewsImage = styled.Image`
  width: ${width * 0.7}px;
  height: ${height * 0.2}px;
  border-radius: ${width * 0.02}px;
  margin-right: ${width * 0.03}px;
`;

export const HighlightCard = styled.View`
  width: ${width * 0.3}px;
  margin-right: ${width * 0.03}px;
`;

export const HighlightImage = styled.Image`
  width: 100%;
  height: ${height * 0.1}px;
  border-radius: ${width * 0.02}px;
`;

export const HighlightText = styled.Text`
  font-size: ${width * 0.03}px;
  color: white;
  margin-top: ${height * 0.005}px;
`;

export const LiveGameCard = styled.View`
  background-color: #1c1c1e;
  border-radius: ${width * 0.02}px;
  margin-top: ${height * 0.02}px;
  padding: ${height * 0.01}px;
`;

export const LiveGameImage = styled.Image`
  width: 100%;
  height: ${height * 0.2}px;
  border-radius: ${width * 0.02}px;
`;

export const LiveGameInfo = styled.View`
  padding: ${height * 0.01}px;
`;

export const LiveText = styled.Text`
  color: red;
  font-weight: bold;
`;

export const GameTitle = styled.Text`
  color: white;
  font-size: ${width * 0.035}px;
  margin-top: ${height * 0.005}px;
  font-weight: bold;
`;

export const BottomNav = styled.View`
  flex-direction: row;
  justify-content: space-around;
  align-items: center;
  background-color: #1c1c1e;
  padding: ${height * 0.015}px 0;
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
`;

export const NavItem = styled.TouchableOpacity`
  align-items: center;
`;

export const NavText = styled.Text`
  color: white;
  font-size: ${width * 0.03}px;
  margin-top: ${height * 0.005}px;
`;
