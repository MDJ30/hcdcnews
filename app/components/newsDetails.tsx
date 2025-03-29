import React, { useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import styled from 'styled-components/native';
import { TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';

const NewsDetails = () => {
  const [news, setNews] = useState<{ title: string; description: string } | null>(null);
  const router = useRouter(); // Initialize router for navigation

  useEffect(() => {
    const fetchNews = async () => {
      try {
        const storedNews = await AsyncStorage.getItem('selectedNews');
        if (storedNews) {
          setNews(JSON.parse(storedNews));
        }
      } catch (error) {
        console.error('Error retrieving news from local storage:', error);
      }
    };

    fetchNews();
  }, []);

  const handleHomePress = () => {
    // Navigate to the dashboard
    router.push('/dashboard');
  };

  const handleProfilePress = () => {
    // Navigate to the profile page
    router.push('./profile');
  };

  if (!news) {
    return (
      <Container>
        <LoadingText>Loading...</LoadingText>
      </Container>
    );
  }

  return (
    <Container>
      <Content>
        <Title>{news.title}</Title>
        <Description>{news.description}</Description>
      </Content>
    </Container>
  );
};

export default NewsDetails;

// Styled components
const Container = styled.View`
  flex: 1;
  background-color: #0a0a0a;
`;

const Content = styled.ScrollView`
  flex: 1;
  padding: 20px;
`;

const Title = styled.Text`
  font-size: 24px;
  font-weight: bold;
  color: white;
  margin-bottom: 10px;
`;

const Description = styled.Text`
  font-size: 16px;
  color: white;
  line-height: 24px;
`;

const LoadingText = styled.Text`
  font-size: 18px;
  color: white;
  text-align: center;
  margin-top: 50px;
`;

const BottomNav = styled.View`
  flex-direction: row;
  justify-content: space-around;
  background-color: #1c1c1e;
  padding: 10px 0;
`;

const NavItem = styled.View`
  align-items: center;
`;

const NavText = styled.Text`
  font-size: 12px;
  color: white;
  margin-top: 5px;
`;