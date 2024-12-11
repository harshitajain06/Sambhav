import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, TextInput, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const SolvePuzzlesLevelScreen = ({ route}) => {
    const navigation = useNavigation();
  const { level } = route.params;
  const [currentPuzzle, setCurrentPuzzle] = useState('');
  const [userAnswer, setUserAnswer] = useState('');
  const [score, setScore] = useState(0);

  useEffect(() => {
    // Load the puzzle based on the level
    if (level.title === 'Level 1: Easy') {
      setCurrentPuzzle('Puzzle 1: What is 2 + 2?');
    } else if (level.title === 'Level 2: Medium') {
      setCurrentPuzzle('Puzzle 2: What is 5 + 7?');
    } else if (level.title === 'Level 3: Hard') {
      setCurrentPuzzle('Puzzle 3: What is 12 + 15?');
    }
  }, [level]);

  const checkAnswer = () => {
    let correctAnswer = 0;
    if (level.title === 'Level 1: Easy') {
      correctAnswer = 4;
    } else if (level.title === 'Level 2: Medium') {
      correctAnswer = 12;
    } else if (level.title === 'Level 3: Hard') {
      correctAnswer = 27;
    }

    if (parseInt(userAnswer) === correctAnswer) {
      setScore(score + 1);
      Alert.alert('Correct!', `Good job!`);
    } else {
      Alert.alert('Incorrect!', `The correct answer was ${correctAnswer}.`);
    }

    // Load next puzzle or reset
    if (level.title === 'Level 1: Easy') {
      setCurrentPuzzle('Puzzle 4: What is 3 + 3?');
      setUserAnswer('');
    }
    // Add more puzzles as needed
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{level.title}</Text>
      <Text style={styles.puzzleText}>{currentPuzzle}</Text>
      <TextInput
        style={styles.input}
        keyboardType="numeric"
        value={userAnswer}
        onChangeText={setUserAnswer}
        placeholder="Enter your answer"
        placeholderTextColor="#888"
      />
      <TouchableOpacity style={styles.submitButton} onPress={checkAnswer}>
        <Text style={styles.submitButtonText}>Submit Answer</Text>
      </TouchableOpacity>
      <Text style={styles.score}>Score: {score}</Text>
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
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#567396',
    marginBottom: 20,
    textAlign: 'center',
    marginTop: 50,
  },
  puzzleText: {
    fontSize: 20,
    color: '#333',
    textAlign: 'center',
    marginBottom: 15,
  },
  input: {
    width: '80%',
    borderWidth: 1,
    borderRadius: 8,
    borderColor: '#ccc',
    textAlign: 'center',
    padding: 10,
    fontSize: 18,
    marginBottom: 15,
    backgroundColor: '#f9f9f9',
  },
  submitButton: {
    backgroundColor: '#567396',
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 25,
    marginBottom: 15,
  },
  submitButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  score: {
    fontSize: 18,
    color: '#333',
    marginBottom: 20,
  },
  backButton: {
    backgroundColor: '#567396',
    paddingVertical: 12,
    paddingHorizontal: 25,
    borderRadius: 25,
  },
  backButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default SolvePuzzlesLevelScreen;
