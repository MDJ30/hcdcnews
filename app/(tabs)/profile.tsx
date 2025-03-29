import React, { useEffect, useState, useRef } from 'react';
import { Animated, TouchableOpacity, View, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useRouter } from 'expo-router';
import LogoutModal from '../components/LogoutModal'; // Import the new LogoutModal component
import {
  Container,
  Header,
  ProfileInfo,
  ProfileImage,
  UserInfo,
  Username,
  Year,
  ManageProfileButton,
  ManageProfileText,
  GradientBackground,
  Grid,
  Card,
  CardText,
  Icon,
  DropdownContainer,
  DropdownItem,
} from '../designs/ProfileStyles';

const Profile = () => {
  const router = useRouter();
  const [userData, setUserData] = useState({
    username: '',
    year_level: '',
    course: '',
    role: '',
  });
  const [isDropdownVisible, setIsDropdownVisible] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const rotation = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const storedUser = await AsyncStorage.getItem('user');
        if (storedUser) {
          setUserData(JSON.parse(storedUser));
        }
      } catch (error) {
        console.error('Failed to load user data from local storage:', error);
      }
    };

    fetchUserData();
  }, []);

  const handleSettingsClick = () => {
    Animated.timing(rotation, {
      toValue: isDropdownVisible ? 0 : 1,
      duration: 300,
      useNativeDriver: true,
    }).start();
    setIsDropdownVisible(!isDropdownVisible);
  };

  const handleLogoutConfirm = async () => {
    try {
      await AsyncStorage.removeItem('user');
      setIsModalVisible(false);
      router.replace('/login');
    } catch (error) {
      console.error('Failed to log out:', error);
    }
  };

  const rotateInterpolate = rotation.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '180deg'],
  });

  return (
    <Container>
      <Header>
        <ProfileInfo>
          <ProfileImage source={{ uri: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRcQg-lr5__zRqY3mRg6erzAD9n4BGp3G8VfA&s' }} />
          <UserInfo>
            <Username>{userData.username || 'Guest'} - {userData.role}</Username>
            <Year>{userData.year_level ? `${userData.year_level} - ${userData.course}` : 'No details available'}</Year>
            <ManageProfileButton>
              <ManageProfileText>Manage Profile</ManageProfileText>
            </ManageProfileButton>
          </UserInfo>
        </ProfileInfo>
        <View>
          <TouchableOpacity onPress={handleSettingsClick}>
            <Animated.View style={{ transform: [{ rotate: rotateInterpolate }] }}>
              <Ionicons name="settings-outline" size={24} color="white" />
            </Animated.View>
          </TouchableOpacity>
          {isDropdownVisible && (
           <DropdownContainer>
           <DropdownItem onPress={() => setIsModalVisible(true)}>
             <Icon name="log-out-outline" size={20} color="white" />
             <CardText>Logout</CardText>
           </DropdownItem>
           <DropdownItem onPress={() => router.push('/components/NotificationSettings')}>
  <Icon name="notifications-outline" size={20} color="white" />
  <CardText>Notification Settings</CardText>
</DropdownItem>
         </DropdownContainer>
          )}
        </View>
      </Header>

      <GradientBackground colors={['#000', '#d80027']} start={{ x: 0, y: 1 }} end={{ x: 1, y: 0 }}>
        <Grid>
          <Card>
            <Icon name="calendar" size={32} color="white" />
            <CardText>Events</CardText>
          </Card>
          <Card>
            <Icon name="bookmark" size={32} color="white" />
            <CardText>Saved</CardText>
          </Card>
          <Card>
            <Icon name="trending-up" size={32} color="white" />
            <CardText>Trending</CardText>
          </Card>
          <Card>
            <Icon name="people" size={32} color="white" />
            <CardText>My Team</CardText>
          </Card>
          <Card>
            <Icon name="basketball" size={32} color="white" />
            <CardText>My Players</CardText>
          </Card>
          <Card>
            <Icon name="megaphone" size={32} color="white" />
            <CardText>Top News</CardText>
          </Card>
        </Grid>
      </GradientBackground>

      {/* Logout Modal */}
      <LogoutModal
        visible={isModalVisible}
        onClose={() => setIsModalVisible(false)}
        onConfirm={handleLogoutConfirm}
      />
    </Container>
  );
};

export default Profile;