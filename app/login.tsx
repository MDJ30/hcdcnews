import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import { Image, Alert, ActivityIndicator } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { LinearGradient } from 'expo-linear-gradient';
import {
  Container, Title, Input, LoginButton, ButtonText,
  BlurredContainer, SignupButton
} from './designs/styles';

export default function LoginScreen() {
  const router = useRouter();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = async () => {
    if (!username || !password) {
      Alert.alert('Error', 'Username and password are required!');
      return;
    }

    setIsLoading(true);

    try {
      const response = await fetch('https://vynceianoani.helioho.st/hcdcnews/login.php', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
      });

      const result = await response.json();

      if (result.success) {
        // Store the user's details in local storage
        await AsyncStorage.setItem('user', JSON.stringify({
          username,
          email: result.email,
          year_level: result.year_level,
          course: result.course,
          role: result.role,
        }));

        Alert.alert('Login Successful', 'Welcome back!');
        router.replace('/dashboard'); // Navigate to the dashboard
      } else {
        Alert.alert('Login Failed', result.message);
      }
    } catch (error) {
      Alert.alert('Error', 'Failed to log in. Please try again later.');
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <LinearGradient colors={['#ffffff', '#e30613']} style={{ flex: 1 }}>
      <Container>
        {/* Logo */}
        <Image source={require('./hcdc.png')} style={{ width: 120, height: 120, alignSelf: 'center' }} />
        <Title>HCDC News Update</Title>

        {/* Blurred Container for login form */}
        <BlurredContainer intensity={50}>
          <Title>Login</Title>
          <Input
            placeholder="Username"
            placeholderTextColor="white"
            value={username}
            onChangeText={setUsername}
          />
          <Input
            placeholder="Password"
            placeholderTextColor="white"
            secureTextEntry
            value={password}
            onChangeText={setPassword}
          />
          {isLoading ? (
            <ActivityIndicator size="large" color="#007bff" style={{ marginTop: 20 }} />
          ) : (
            <>
              <LoginButton onPress={handleLogin}>
                <ButtonText>Login</ButtonText>
              </LoginButton>
              <SignupButton onPress={() => router.push('/register')}>
                <ButtonText>Sign Up</ButtonText>
              </SignupButton>
            </>
          )}
        </BlurredContainer>
      </Container>
    </LinearGradient>
  );
}