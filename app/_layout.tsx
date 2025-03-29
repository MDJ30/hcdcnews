import { Stack } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { useEffect } from 'react';
import { useRouter } from 'expo-router';

export default function RootLayout() {
  const router = useRouter();

  useEffect(() => {
    const checkUser = async () => {
      try {
        const user = await AsyncStorage.getItem('user');
        if (user) {
          // If user data exists, navigate to the dashboard (tabs)
          router.replace('/dashboard');
        }
      } catch (error) {
        console.error('Failed to check user data:', error);
      }
    };

    checkUser();
  }, []);

  return (
    <Stack initialRouteName="login">
      <Stack.Screen name="login" options={{ headerShown: false }} />
      <Stack.Screen name="register" options={{ headerShown: false }} />
      <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
      <Stack.Screen
        name="components/newsDetails"
        options={{
          headerShown: false, // Show header for the newsDetails screen
          title: 'News Details', // Customize the header title
        }}
      />
      <Stack.Screen name="components/NotificationSettings" options={{ headerShown: false }} />
    </Stack>
  );
}