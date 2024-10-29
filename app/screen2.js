import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Image,
  Dimensions,
} from 'react-native';
import Carousel from 'react-native-reanimated-carousel';
import { useLocalSearchParams } from 'expo-router';

const { width } = Dimensions.get('window');

const carouselItems = [
  {
    name: 'Alex',
    age: 29,
    image:
      'https://plus.unsplash.com/premium_photo-1691784778805-e1067ac42e01?q=80&w=2670&auto=format&fit=crop&ixlib=rb-4.0.3',
  },
  {
    name: 'Jordan',
    age: 24,
    image:
      'https://images.unsplash.com/photo-1531750026848-8ada78f641c2?q=80&w=2670&auto=format&fit=crop&ixlib=rb-4.0.3',
  },
  {
    name: 'Taylor',
    age: 27,
    image:
      'https://plus.unsplash.com/premium_photo-1689747698547-271d2d553cee?q=80&w=2670&auto=format&fit=crop&ixlib=rb-4.0.3',
  },
  {
    name: 'Sam',
    age: 31,
    image:
      'https://plus.unsplash.com/premium_photo-1693000696650-e73643956033?q=80&w=2671&auto=format&fit=crop&ixlib=rb-4.0.3',
  },
];

const studios = {
  Yoga: ['Zen Flow', 'Namaste Studio', 'Harmony Yoga', 'Soul Stretch'],
  Pilates: [
    'CoreBalance Studio',
    'Pilates Pulse',
    'FlexFlow Pilates',
    'Precision Core',
  ],
  'Rock Climbing': ['Summit Heights', 'Grip & Go Climbing'],
  HIIT: ['HIIT Factory', 'BlazeFit', 'Power Circuit'],
  Running: ['Stride Lab', 'Pace Run Studio', 'Run Tribe', 'Endurance Mile'],
  Cycling: ['Spin Revolution', 'Pedal Power'],
  Tennis: ['Ace Court'],
  'Strength Training': [
    'Iron Forge',
    'PowerHouse Strength',
    'Barbell Nation',
    'Lift Lab',
  ],
};

export default function Screen2() {
    const { selectedWorkouts } = useLocalSearchParams();
    const workouts = JSON.parse(selectedWorkouts);

  const getStudioRecommendations = () => {
    let recommendations = [];
    workouts.forEach((workout) => {
      const workoutStudios = studios[workout] || [];
      recommendations = recommendations.concat(workoutStudios.slice(0, 2));
    });
    return recommendations.slice(0, 5);
  };

  const renderCarouselItem = ({ item }) => (
    <View style={styles.carouselItem}>
      <Image source={{ uri: item.image }} style={styles.carouselImage} />
      <Text style={styles.carouselText}>{`${item.name}, ${item.age}`}</Text>
    </View>
  );

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.greeting}>Hi [your name]!</Text>
      <Text style={styles.sectionTitle}>Favorite Workouts</Text>
      <View style={styles.bubbleContainer}>
        {workouts.map((workout) => (
          <View style={styles.bubble} key={workout}>
            <Text style={styles.bubbleText}>{workout}</Text>
          </View>
        ))}
      </View>

      <Text style={styles.sectionTitle}>Your Matches</Text>
      <Carousel
        width={width}
        height={300}
        data={carouselItems}
        renderItem={renderCarouselItem}
        scrollAnimationDuration={1000}
      />

      <Text style={styles.sectionTitle}>Studio Recommendations</Text>
      <View style={styles.bubbleContainer}>
        {getStudioRecommendations().map((studio) => (
          <View style={styles.studioBubble} key={studio}>
            <Text style={styles.bubbleText}>{studio}</Text>
          </View>
        ))}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
      container: {
    paddingBottom: 20,
    alignItems: 'center',
  },
  greeting: {
    fontSize: 28,
    marginVertical: 20,
  },
  sectionTitle: {
    fontSize: 24,
    marginVertical: 10,
  },
  bubbleContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
  },
  bubble: {
    backgroundColor: '#E6E6FA',
    padding: 10,
    margin: 5,
    borderRadius: 20,
  },
  studioBubble: {
    backgroundColor: '#D3D3D3',
    padding: 10,
    margin: 5,
    borderRadius: 20,
  },
  bubbleText: {
    fontWeight: 'bold',
    textAlign: 'center',
  },
  carouselItem: {
    backgroundColor: '#FFF',
    borderRadius: 8,
    height: 250,
    padding: 20,
    alignItems: 'center',
    marginHorizontal: 10,
    width: width - 60, // Adjust width to fit the screen
  },
  carouselImage: {
    width: '100%',
    height: 150,
    borderRadius: 8,
  },
  carouselText: {
    marginTop: 10,
    fontSize: 18,
  },
  flatList: {
    maxHeight: 280,
  },
});
