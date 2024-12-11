import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const LearnChessLevelScreen = ({ route }) => {
    const navigation = useNavigation();
  const { level } = route.params;
  const [currentLesson, setCurrentLesson] = useState('');

  useEffect(() => {
    // Load the lesson based on the level
    if (level.title === 'Level 1: Opening') {
      setCurrentLesson('Welcome to Level 1: Opening Strategies!\n\nIn this lesson, you will learn about fundamental opening principles, such as controlling the center, developing your pieces, and ensuring king safety.');
    } else if (level.title === 'Level 2: Midgame') {
      setCurrentLesson('Welcome to Level 2: Midgame Tactics!\n\nThis lesson covers various tactical motifs, including forks, pins, skewers, and discovered attacks to improve your midgame play.');
    } else if (level.title === 'Level 3: Endgame') {
      setCurrentLesson('Welcome to Level 3: Endgame Principles!\n\nIn this lesson, you will explore essential endgame techniques, such as king and pawn endings, opposition, and creating passed pawns.');
    }
  }, [level]);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{level.title}</Text>
      <ScrollView style={styles.lessonContainer}>
        <Text style={styles.lessonText}>{currentLesson}</Text>
      </ScrollView>
      <TouchableOpacity
        style={styles.backButton}
        onPress={() => navigation.goBack()}
      >
        <Text style={styles.backButtonText}>Back to Games</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F4F7FC',
    padding: 20,
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  title: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#567396',
    marginBottom: 20,
    textAlign: 'center',
    marginTop: 50,
  },
  lessonContainer: {
    width: '100%',
    marginBottom: 30,
  },
  lessonText: {
    fontSize: 18,
    color: '#333',
    textAlign: 'left',
  },
  backButton: {
    backgroundColor: '#567396',
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 25,
    marginBottom: 20,
  },
  backButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default LearnChessLevelScreen;
