import React, { useState, useEffect } from 'react';
import { ScrollView, Alert, ActivityIndicator, View, Text, Image, StyleSheet, RefreshControl } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

type NotificationItem = {
  id: number;
  title: string;
  message: string;
  date: string;
  program: string;
  image: string;
  is_read: number;
};

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

const NotificationsScreen = () => {
  const [notifications, setNotifications] = useState<NotificationItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [latestId, setLatestId] = useState<number | null>(null);

  useEffect(() => {
    fetchNotifications();

    const interval = setInterval(() => {
      fetchNotifications();
    }, 1800000); // fetch every 30 minutes

    return () => clearInterval(interval);
  }, []);

  const fetchNotifications = async () => {
    try {
      setLoading(true);
      const response = await fetch('https://vynceianoani.helioho.st/hcdcnews/get_notifications.php');
      const data = await response.json();

      if (data.notifications && Array.isArray(data.notifications)) {
        setNotifications(data.notifications);

        if (latestId !== null && data.notifications[0]?.id > latestId) {
          const newNotification = data.notifications[0];
          sendPushNotification(newNotification.title, newNotification.message);
        }

        if (data.notifications.length > 0) {
          setLatestId(data.notifications[0].id);
        }
      } else if (data.error) {
        console.error('Server error:', data.error);
        Alert.alert('Error', data.error);
      } else {
        console.error('Unexpected response format:', data);
        Alert.alert('Error', 'Unexpected server response.');
      }
    } catch (error) {
      console.error('Fetch error:', error);
      Alert.alert('Error', 'Could not fetch notifications.');
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  const sendPushNotification = async (title: string, message: string) => {
    const body = {
      appId: 28771, // your Native Notify app ID
      appToken: "1hDYM684l2hCrLR9c006pt", // your Native Notify app token
      title: title,
      body: message,
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
        console.log('Push notification sent successfully.');
      } else {
        console.error('Failed to send push notification:', await response.text());
      }
    } catch (error) {
      console.error('Error sending push notification:', error);
    }
  };

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
            refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} tintColor="#ffffff" />}
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
                  <Text style={styles.notificationMessage}>{notification.program}</Text>
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
    backgroundColor: '#000',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
    color: '#fff',
  },
  loader: {
    marginTop: 20,
  },
  notificationContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#444',
    borderRadius: 10,
    padding: 10,
    marginBottom: 15,
    backgroundColor: '#1c1c1e',
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
    color: '#fff',
    marginBottom: 5,
  },
  notificationMessage: {
    fontSize: 14,
    color: '#ccc',
    marginBottom: 5,
  },
  notificationDate: {
    fontSize: 12,
    color: '#999',
    textAlign: 'right',
  },
});

export default NotificationsScreen;
