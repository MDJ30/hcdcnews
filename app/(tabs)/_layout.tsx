import React, { useState, useEffect } from 'react';
import { Tabs, useRootNavigationState } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { StyleSheet, View, Text } from 'react-native';

export default function DashboardLayout() {
  const state = useRootNavigationState();

  // Check if the current route is "login"
  const isLoginScreen = state?.routes[state.index]?.name === 'login';

  // State to track the number of notifications
  const [notificationCount, setNotificationCount] = useState(0);

  // Function to fetch the number of notifications
  // Function to fetch the number of notifications
const fetchNotificationCount = async () => {
  try {
    const response = await fetch('https://vynceianoani.helioho.st/hcdcnews/get_notifications.php');
    const data = await response.json();

    if (data.count !== undefined) {
      setNotificationCount(data.count); // Set the count of notifications
    }
  } catch (error) {
    console.error('Failed to fetch notification count:', error);
  }
};

  // Fetch notifications count when the component mounts
  useEffect(() => {
    fetchNotificationCount();
  }, []);

  return (
    <>
      {!isLoginScreen && ( // Hide Tabs when on the login screen
        <Tabs
          screenOptions={{
            headerShown: false, // Globally remove the header for all tabs
            tabBarStyle: styles.tabBar, // Apply custom styles to the tab bar
            tabBarActiveTintColor: '#e30613', // Active tab icon and label color
            tabBarInactiveTintColor: '#8e8e93', // Inactive tab icon and label color
            tabBarLabelStyle: styles.tabBarLabel, // Style for tab labels
          }}
        >
          <Tabs.Screen
            name="dashboard"
            options={{
              title: 'Home',
              tabBarIcon: ({ color, size }) => (
                <Ionicons name="home" size={size} color={color} />
              ),
            }}
          />
          <Tabs.Screen
            name="profile"
            options={{
              title: 'Profile',
              tabBarIcon: ({ color, size }) => (
                <Ionicons name="person" size={size} color={color} />
              ),
            }}
          />
          <Tabs.Screen
            name="colleges"
            options={{
              title: 'Colleges',
              tabBarIcon: ({ color, size }) => (
                <Ionicons name="school" size={size} color={color} />
              ),
            }}
          />
          <Tabs.Screen
  name="notifications"
  options={{
    title: 'Notifications',
    tabBarIcon: ({ color, size }) => (
      <View>
        <Ionicons name="notifications" size={size} color={color} />
        {notificationCount > 0 && (
          <View style={styles.badge}>
            <Text style={styles.badgeText}>{notificationCount}</Text>
          </View>
        )}
      </View>
    ),
    tabBarButton: (props) => (
      <View
        {...props}
        onTouchEnd={(event) => {
          props.onPress?.(event); // Trigger the default navigation behavior
          setNotificationCount(0); // Reset the notification count
        }}
      />
    ),
  }}
/>
          
        </Tabs>
      )}
    </>
  );
}

const styles = StyleSheet.create({
  tabBar: {
    backgroundColor: '#1c1c1e', // Dark background for the tab bar
    borderTopWidth: 0, // Remove the border at the top of the tab bar
    height: 60, // Increase the height of the tab bar
    paddingBottom: 10, // Add padding at the bottom
    paddingTop: 5, // Add padding at the top
  },
  tabBarLabel: {
    fontSize: 12, // Font size for tab labels
    fontWeight: '600', // Make the labels semi-bold
  },
  badge: {
    position: 'absolute',
    right: -10,
    top: -5,
    backgroundColor: '#e30613',
    borderRadius: 10,
    width: 20,
    height: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  badgeText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: 'bold',
  },
});