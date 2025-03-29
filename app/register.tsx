import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import { Alert, View, StyleSheet } from 'react-native';
import DropDownPicker from 'react-native-dropdown-picker'; // Import the dropdown picker
import { Container, Title, Input, LoginButton, ButtonText, LinkText } from './designs/register';

export default function RegisterScreen() {
  const router = useRouter();
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [course, setCourse] = useState('');
  const [yearLevel, setYearLevel] = useState('');
  const [role, setRole] = useState(null); // Role state
  const [open, setOpen] = useState(false); // Dropdown open state
  const [items, setItems] = useState([
    { label: 'Student', value: 'Student' },
    { label: 'Faculty', value: 'Faculty' },
  ]); // Dropdown items

  const handleRegister = async () => {
    if (password !== confirmPassword) {
      Alert.alert('Error', 'Passwords do not match!');
      return;
    }

    if (!username || !email || !password || !course || !yearLevel || !role) {
      Alert.alert('Error', 'All fields are required!');
      return;
    }

    try {
      const response = await fetch('https://vynceianoani.helioho.st/hcdcnews/registration.php', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username,
          email,
          password,
          course,
          year_level: yearLevel,
          role, // Include the role in the request
        }),
      });

      const result = await response.json();

      if (result.success) {
        Alert.alert('Success', 'Account created successfully!');
        router.replace('/login'); // Navigate back to login after successful registration
      } else {
        Alert.alert('Error', result.message);
      }
    } catch (error) {
      Alert.alert('Error', 'Failed to register. Please try again later.');
      console.error(error);
    }
  };

  return (
    <Container>
      <Title>Register</Title>
      <Input
        placeholder="Username"
        value={username}
        onChangeText={setUsername}
      />
      <Input
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
      />
      <Input
        placeholder="Password"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
      />
      <Input
        placeholder="Confirm Password"
        secureTextEntry
        value={confirmPassword}
        onChangeText={setConfirmPassword}
      />
      <Input
        placeholder="Course"
        value={course}
        onChangeText={setCourse}
      />
      <Input
        placeholder="Year Level"
        value={yearLevel}
        onChangeText={setYearLevel}
      />

      {/* Role Selection with Dropdown */}
      <View style={styles.dropdownContainer}>
        <DropDownPicker
          open={open}
          value={role}
          items={items}
          setOpen={setOpen}
          setValue={setRole}
          setItems={setItems}
          placeholder="Select Role"
          style={styles.dropdown}
          dropDownContainerStyle={styles.dropdownList}
        />
      </View>

      <LoginButton onPress={handleRegister}>
        <ButtonText>Register</ButtonText>
      </LoginButton>
      <LinkText onPress={() => router.push('/login')}>
        Already have an account? Login
      </LinkText>
    </Container>
  );
}

const styles = StyleSheet.create({
  dropdownContainer: {
    marginVertical: 20,
    zIndex: 1000, // Ensure dropdown appears above other elements
  },
  dropdown: {
    backgroundColor: '#f0f0f0',
    borderColor: '#d80027',
  },
  dropdownList: {
    backgroundColor: '#f0f0f0',
  },
});