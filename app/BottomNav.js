import React from 'react';
import { TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { BottomNav, NavItem, NavText } from './designs/designIndex'; // Import styled components

const BottomNavigation = () => {
  const router = useRouter();

  const handleNavigation = (route) => {
    // Navigate to the specified route
    router.push(route);
  };

  return (
    <BottomNav>
      <TouchableOpacity onPress={() => handleNavigation('dashboard')}>
        <NavItem>
          <Ionicons name="home" size={24} color="white" />
          <NavText>Home</NavText>
        </NavItem>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => handleNavigation('profile')}>
        <NavItem>
          <Ionicons name="person" size={24} color="white" />
          <NavText>Profile</NavText>
        </NavItem>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => handleNavigation('designIndex')}>
        <NavItem>
          <Ionicons name="school" size={24} color="white" />
          <NavText>Colleges</NavText>
        </NavItem>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => handleNavigation('notifications')}>
        <NavItem>
          <Ionicons name="notifications" size={24} color="white" />
          <NavText>Notification</NavText>
        </NavItem>
      </TouchableOpacity>
    </BottomNav>
  );
};

export default BottomNavigation;