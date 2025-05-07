import React, { useRef, useState } from 'react';
import { useRouter } from 'expo-router';
import {
  FlatList,
  ScrollView,
  Animated,
  TouchableOpacity,
  TextInput,
  View,
  Image,
  RefreshControl,
} from 'react-native';
import { WebView } from 'react-native-webview'; // Import WebView
import ShimmerPlaceholder from 'react-native-shimmer-placeholder';
import { Ionicons } from '@expo/vector-icons';
import {
  Container,
  Header,
  Title,
  SectionTitle,
  HighlightCard,
  HighlightText,
  LiveGameCard,
  LiveGameInfo,
  LiveText,
  GameTitle,
} from '../designs/designIndex'; // Import styled components
import NewsModal from '../components/NewsModal'; // Import the new NewsModal component
const DashboardScreen = ({ navigation }: { navigation: any }) => {
  const hotNews = [
    { id: '1', title: 'Breaking News 1', description: 'Brief description of news 1', image: require('../sports.jpg') },
    { id: '2', title: 'Breaking News 2', description: 'Brief description of news 2', image: require('../sports.jpg') },
    { id: '3', title: 'Breaking News 2', description: 'Brief description of news 2', image: require('../sports.jpg') },
    { id: '4', title: 'Breaking News 2', description: 'Brief description of news 2', image: require('../sports.jpg') },
  ];

  const gameHighlights = [
    { id: '1', title: 'Game Recap: Warriors', description: 'Brief description of game recap', image: require('../sports.jpg') },
    { id: '2', title: 'Massive dunk!', description: 'Brief description of massive dunk', image: require('../sports.jpg') },
    { id: '3', title: 'Injury update', description: 'Brief description of injury update', image: require('../sports.jpg') },
  ];

  const [isSearchActive, setIsSearchActive] = useState(false); // State to track search bar visibility
  const [loadingImages, setLoadingImages] = useState<Record<string, boolean>>({}); // Define type for loadingImages
  const [refreshing, setRefreshing] = useState(false); // State to track refreshing
  const [selectedNews, setSelectedNews] = useState<any>(null); // State to track selected news for modal
  const searchBarWidth = useRef(new Animated.Value(40)).current; // Initial width of the search bar
  const inputRef = useRef<TextInput>(null); // Reference to the TextInput
  const router = useRouter();

  const toggleSearchBar = () => {
    if (isSearchActive) {
      Animated.timing(searchBarWidth, {
        toValue: 40,
        duration: 300,
        useNativeDriver: false,
      }).start(() => {
        setIsSearchActive(false);
        inputRef.current?.blur();
      });
    } else {
      setIsSearchActive(true);
      Animated.timing(searchBarWidth, {
        toValue: 200,
        duration: 300,
        useNativeDriver: false,
      }).start(() => {
        inputRef.current?.focus();
      });
    }
  };

  const handleImageLoadStart = (id: string) => {
    setLoadingImages((prev) => ({ ...prev, [id]: true }));
  };

  const handleImageLoadEnd = (id: string) => {
    setLoadingImages((prev) => ({ ...prev, [id]: false }));
  };

  const onRefresh = () => {
    setRefreshing(true);
    setLoadingImages({});
    setTimeout(() => {
      setRefreshing(false);
    }, 2000);
  };

  const openModal = (news: any) => {
    setSelectedNews(news);
  };

  const closeModal = () => {
    setSelectedNews(null);
  };

  const navigateToDetails = () => {
    closeModal();
    router.push('/components/newsDetails');
  };

  return (
    
      <Container>
        {/* Header */}
        <Header>
          <Title>🔥 HOT NEWS</Title>
          <Animated.View
            style={{
              backgroundColor: '#1c1c1e',
              padding: 8,
              borderRadius: 20,
              flexDirection: 'row',
              alignItems: 'center',
              width: searchBarWidth,
            }}
          >
            <TouchableOpacity onPress={toggleSearchBar}>
              <Ionicons name="search" size={20} color="gray" />
            </TouchableOpacity>
            {isSearchActive && (
              <TextInput
                ref={inputRef}
                placeholder="Search..."
                placeholderTextColor="gray"
                style={{
                  flex: 1,
                  marginLeft: 10,
                  color: 'white',
                }}
              />
            )}
          </Animated.View>
        </Header>

        <ScrollView
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
        >
          {/* Hot News Section */}
          <SectionTitle>HOT NEWS</SectionTitle>
          <FlatList
            horizontal
            data={hotNews}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
              <TouchableOpacity onPress={() => openModal(item)}>
                <View style={{ position: 'relative', width: 150, height: 100, marginRight: 10 }}>
                  <ShimmerPlaceholder
                    visible={!loadingImages[item.id]}
                    style={{ width: '100%', height: '100%', borderRadius: 10 }}
                  >
                    <Image
                      source={item.image}
                      style={{ width: '100%', height: '100%', borderRadius: 10 }}
                      onLoadStart={() => handleImageLoadStart(item.id)}
                      onLoadEnd={() => handleImageLoadEnd(item.id)}
                    />
                  </ShimmerPlaceholder>
                </View>
              </TouchableOpacity>
            )}
            showsHorizontalScrollIndicator={false}
          />
          <SectionTitle>GAME HIGHLIGHTS</SectionTitle>
          <FlatList
            horizontal
            data={gameHighlights}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
              <TouchableOpacity onPress={() => openModal(item)}>
                <HighlightCard>
                  <View style={{ position: 'relative', width: 150, height: 100 }}>
                    <ShimmerPlaceholder
                      visible={!loadingImages[item.id]}
                      style={{ width: '100%', height: '100%', borderRadius: 10 }}
                    >
                      <Image
                        source={item.image}
                        style={{ width: '100%', height: '100%', borderRadius: 10 }}
                        onLoadStart={() => handleImageLoadStart(item.id)}
                        onLoadEnd={() => handleImageLoadEnd(item.id)}
                      />
                    </ShimmerPlaceholder>
                  </View>
                  <HighlightText>{item.title}</HighlightText>
                </HighlightCard>
              </TouchableOpacity>
            )}
            showsHorizontalScrollIndicator={false}
          />
           <LiveGameCard>
          <WebView
            source={{
              uri: 'https://www.facebook.com/plugins/video.php?href=https://www.facebook.com/facebook/videos/10153231379946729/',
            }} // Replace with your Facebook Live video URL
            style={{ height: 300 }}
          />
          <LiveGameInfo>
            <LiveText>LIVE</LiveText>
            <GameTitle>Facebook Live Stream</GameTitle>
          </LiveGameInfo>
        </LiveGameCard>
        </ScrollView>

        {/* Modal for News Details */}
        <NewsModal
          visible={!!selectedNews}
          news={selectedNews}
          onClose={closeModal}
          onSeeMore={navigateToDetails}
        />
      </Container>
    
  );
};

export default DashboardScreen;