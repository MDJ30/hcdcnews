import React from 'react';
import { View, Text, StyleSheet, ScrollView, Image } from 'react-native';

export default function CollegesScreen() {
  // Map of college names to their respective logos
  const colleges = [
    { name: 'SBME', logo: require('../hcdc.png') },
    { name: 'STE', logo: require('../hcdc.png') },
    { name: 'CET', logo: require('../hcdc.png') },
    { name: 'COME', logo: require('../hcdc.png') },
    { name: 'HUSOCOM', logo: require('../hcdc.png') },
    { name: 'CHATME', logo: require('../hcdc.png') },
    { name: 'CCJE', logo: require('../hcdc.png') },
    { name: 'GRADUATE SCHOOL', logo: require('../hcdc.png') },
    { name: 'OTHERS', logo: require('../hcdc.png') },
  ];

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Colleges</Text>
      {colleges.map((college) => (
        <View key={college.name} style={styles.collegeContainer}>
          <Image source={college.logo} style={styles.logo} />
          <Text style={styles.label}>{college.name}</Text>
        </View>
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: '#000', // Black background
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
    color: '#fff', // White text for the title
  },
  collegeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#444', // Dark gray border
    borderRadius: 10,
    padding: 10,
    marginBottom: 15,
    backgroundColor: '#1c1c1e', // Dark gray background for each college
  },
  logo: {
    width: 50,
    height: 50,
    marginRight: 15,
    borderRadius: 5,
  },
  label: {
    fontSize: 16,
    fontWeight: '600',
    color: '#fff', // White text for the college name
  },
});