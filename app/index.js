import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Alert,
} from 'react-native';
import { useRouter } from 'expo-router';

const workoutsList = [
  'Yoga',
  'Pilates',
  'Rock Climbing',
  'HIIT',
  'Running',
  'Cycling',
  'Tennis',
  'Strength Training',
];

export default function Screen1() {
  const [selectedWorkouts, setSelectedWorkouts] = useState([]);
  const router = useRouter();

  const toggleWorkout = (workout) => {
    if (selectedWorkouts.includes(workout)) {
      setSelectedWorkouts(selectedWorkouts.filter((w) => w !== workout));
    } else {
      if (selectedWorkouts.length < 4) {
        setSelectedWorkouts([...selectedWorkouts, workout]);
      } else {
        Alert.alert('You can select up to 4 workouts.');
      }
    }
  };

  const handleNext = () => {
    if (selectedWorkouts.length < 1 || selectedWorkouts.length > 4) {
      Alert.alert('Please select between 1 and 4 workouts.');
    } else {
      router.push({
        pathname: 'screen2',
        params: { selectedWorkouts: JSON.stringify(selectedWorkouts) },
      });
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Select Favorite Workouts</Text>
      {workoutsList.map((workout) => (
        <TouchableOpacity
          key={workout}
          style={styles.workoutBox}
          onPress={() => toggleWorkout(workout)}
        >
          <Text style={styles.workoutText}>{workout}</Text>
          <View
            style={[
              styles.circle,
              selectedWorkouts.includes(workout) && styles.selectedCircle,
            ]}
          />
        </TouchableOpacity>
      ))}
      <TouchableOpacity style={styles.nextButton} onPress={handleNext}>
        <Text style={styles.nextButtonText}>Next</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  // ... (same styles as before)
  container: {
    padding: 20,
    alignItems: 'center',
  },
  title: {
    marginVertical: 20,
    fontSize: 24,
    fontWeight: 'bold',
  },
  workoutBox: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: '#E6E6FA',
    padding: 15,
    marginVertical: 5,
    width: '100%',
    borderRadius: 5,
  },
  workoutText: {
    fontSize: 18,
    color: '#000',
  },
  circle: {
    height: 24,
    width: 24,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#000',
    backgroundColor: '#FFF',
  },
  selectedCircle: {
    backgroundColor: 'purple',
  },
  nextButton: {
    backgroundColor: 'blue',
    padding: 15,
    marginTop: 20,
    alignSelf: 'flex-end',
    borderRadius: 5,
  },
  nextButtonText: {
    color: '#FFF',
    fontSize: 16,
  },
});
