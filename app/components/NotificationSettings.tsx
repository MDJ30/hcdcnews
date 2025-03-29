import React, { useState, useEffect } from 'react';
import { Switch, Alert } from 'react-native';
import styled from 'styled-components/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const NotificationSettings = () => {
  const [isNotificationsEnabled, setIsNotificationsEnabled] = useState(false);

  // Load the saved notification setting from AsyncStorage
  useEffect(() => {
    const loadNotificationSetting = async () => {
      try {
        const savedSetting = await AsyncStorage.getItem('notificationsEnabled');
        if (savedSetting !== null) {
          setIsNotificationsEnabled(JSON.parse(savedSetting));
        }
      } catch (error) {
        console.error('Failed to load notification setting:', error);
      }
    };

    loadNotificationSetting();
  }, []);

  // Toggle the notification setting and save it to AsyncStorage
  const toggleSwitch = async () => {
    const newValue = !isNotificationsEnabled;
    setIsNotificationsEnabled(newValue);

    try {
      await AsyncStorage.setItem('notificationsEnabled', JSON.stringify(newValue));
      if (newValue) {
        Alert.alert('Notifications Enabled', 'You will now receive notifications.');
      } else {
        Alert.alert('Notifications Disabled', 'You will no longer receive notifications.');
      }
    } catch (error) {
      console.error('Failed to save notification setting:', error);
    }
  };

  return (
    <Container>
      <Title>Notification Settings</Title>
      <SettingRow>
        <SettingText>Allow Notifications</SettingText>
        <Switch
          trackColor={{ false: '#767577', true: '#d80027' }}
          thumbColor={isNotificationsEnabled ? '#ffffff' : '#f4f3f4'}
          ios_backgroundColor="#3e3e3e"
          onValueChange={toggleSwitch}
          value={isNotificationsEnabled}
        />
      </SettingRow>
    </Container>
  );
};

export default NotificationSettings;

// Styled-components
const Container = styled.View`
  flex: 1;
  background-color: #f5f5f5;
  padding: 20px;
`;

const Title = styled.Text`
  font-size: 24px;
  font-weight: bold;
  color: #333333;
  margin-bottom: 20px;
`;

const SettingRow = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding: 15px;
  background-color: #ffffff;
  border-radius: 10px;
  margin-bottom: 10px;
  elevation: 2;
`;

const SettingText = styled.Text`
  font-size: 16px;
  color: #333333;
`;