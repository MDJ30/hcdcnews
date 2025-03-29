import React, { useState, useEffect } from 'react';
import { ScrollView, Alert, ActivityIndicator, View, Text, Image, StyleSheet, RefreshControl } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

// Define the Notification type
type Notification = {
  id: number;
  title: string;
  message: string;
  date: string; // Date in string format (e.g., "2025-03-29T12:00:00Z")
  program: string;
  image: string; // Base64-encoded image
  is_read: number;
};

// Utility function to calculate relative time
const getRelativeTime = (dateString: string): string => {
  const notificationDate = new Date(dateString);
  const now = new Date();
  const diffInMs = now.getTime() - notificationDate.getTime();
  const diffInMinutes = Math.floor(diffInMs / (1000 * 60));

  if (diffInMinutes < 1) return 'Just now';
  if (diffInMinutes < 60) return `${diffInMinutes} minute${diffInMinutes > 1 ? 's' : ''} ago`;
  const diffInHours = Math.floor(diffInMinutes / 60);
  if (diffInHours < 24) return `${diffInHours} hour${diffInHours > 1 ? 's' : ''} ago`;
  const diffInDays = Math.floor(diffInHours / 24);
  return `${diffInDays} day${diffInDays > 1 ? 's' : ''} ago`;
};

const Notifications = () => {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false); // State for pull-to-refresh
  const [latestId, setLatestId] = useState<number | null>(null); // Track the latest notification ID

  // Function to fetch notifications from the server
  const fetchNotifications = async () => {
    try {
      setLoading(true);
      const response = await fetch('https://vynceianoani.helioho.st/hcdcnews/get_notifications.php');
      const data = await response.json();

      if (data.notifications && Array.isArray(data.notifications)) {
        setNotifications(data.notifications);

        // Check if there's a new notification
        if (latestId !== null && data.notifications[0]?.id > latestId) {
          const newNotification = data.notifications[0];
          sendPushNotification(newNotification.title, newNotification.message);
        }

        // Update the latest notification ID
        if (data.notifications.length > 0) {
          setLatestId(data.notifications[0].id);
        }
      } else if (data.error) {
        console.error('Server error:', data.error);
        Alert.alert('Error', data.error);
      } else {
        console.error('Unexpected response format:', data);
        Alert.alert('Error', 'Unexpected response from the server.');
      }
    } catch (error) {
      console.error('Failed to fetch notifications:', error);
      Alert.alert('Error', 'Failed to fetch notifications. Please try again later.');
    } finally {
      setLoading(false);
      setRefreshing(false); // Stop the pull-to-refresh spinner
    }
  };

  // Function to send a push notification using the Native Notify API
  const sendPushNotification = async (title: string, message: string) => {
    const currentDate = new Date();
    const formattedDate = `${currentDate.getMonth() + 1}-${currentDate.getDate()}-${currentDate.getFullYear()} ${currentDate.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: true })}`;

    const body = {
      appId: 28771,
      appToken: "1hDYM684l2hCrLR9c006pt",
      title: title,
      body: message,
      dateSent: formattedDate,
    };

    try {
      const response = await fetch('https://app.nativenotify.com/api/notification', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(body),
      });

      if (response.ok) {
        console.log('Push notification sent successfully');
      } else {
        console.error('Failed to send push notification:', response.statusText);
      }
    } catch (error) {
      console.error('Error sending push notification:', error);
    }
  };

  // Fetch notifications when the component mounts
  useEffect(() => {
    fetchNotifications();
  }, []);

  // Handle pull-to-refresh
  const onRefresh = () => {
    setRefreshing(true);
    fetchNotifications();
  };

  return (
    <LinearGradient
      colors={['#000', '#1c1c1e']}
      start={{ x: 0, y: 1 }}
      end={{ x: 1, y: 0 }}
      style={styles.gradient}
    >
      <View style={styles.container}>
        <Text style={styles.title}>Notifications</Text>
        {loading && !refreshing ? (
          <ActivityIndicator size="large" color="#ffffff" style={styles.loader} />
        ) : (
          <ScrollView
            refreshControl={
              <RefreshControl refreshing={refreshing} onRefresh={onRefresh} tintColor="#ffffff" />
            }
          >
            {notifications.map((notification) => (
              <View key={notification.id} style={styles.notificationContainer}>
                {notification.image && (
                  <Image
                    source={{ uri: `data:image/jpeg;base64,${notification.image}` }}
                    style={styles.logo}
                  />
                )}
                <View style={styles.notificationContent}>
                  <Text style={styles.notificationTitle}>{notification.title}</Text>
                  <Text style={styles.notificationMessage}>{notification.message}</Text>
                  <Text style={styles.notificationDate}>{getRelativeTime(notification.date)}</Text>
                </View>
              </View>
            ))}
          </ScrollView>
        )}
      </View>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  gradient: {
    flex: 1,
  },
  container: {
    flex: 1,
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
  loader: {
    marginTop: 20,
  },
  notificationContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#444', // Dark gray border
    borderRadius: 10,
    padding: 10,
    marginBottom: 15,
    backgroundColor: '#1c1c1e', // Dark gray background for each notification
  },
  logo: {
    width: 50,
    height: 50,
    marginRight: 15,
    borderRadius: 5,
  },
  notificationContent: {
    flex: 1,
  },
  notificationTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#fff', // White text for the notification title
    marginBottom: 5,
  },
  notificationMessage: {
    fontSize: 14,
    color: '#ccc', // Light gray text for the message
    marginBottom: 5,
  },
  notificationDate: {
    fontSize: 12,
    color: '#999', // Gray text for the date
    textAlign: 'right',
  },
});

export default Notifications;