import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, Alert, StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons'; // Import Ionicons for the back icon
import { useNavigation } from '@react-navigation/native'; // Import useNavigation for navigation

const AdditionGameLevelScreen = ({ route }) => {
  const { level } = route.params; // Get the level data (object)

  // Destructure level properties like title
  const { title } = level; 

  const difficulty = {
    'Level 1: Basic Addition': { range: 10 },
    'Level 2: Intermediate Addition': { range: 50 },
    'Level 3: Advanced Addition': { range: 100 },
  };

  const [num1, setNum1] = useState(Math.floor(Math.random() * (difficulty[title]?.range || 10)) + 1);
  const [num2, setNum2] = useState(Math.floor(Math.random() * (difficulty[title]?.range || 10)) + 1);
  const [userAnswer, setUserAnswer] = useState('');
  const [score, setScore] = useState(0);

  const navigation = useNavigation(); // Get navigation object

  useEffect(() => {
    // Reset question when level changes
    setNum1(Math.floor(Math.random() * (difficulty[title]?.range || 10)) + 1);
    setNum2(Math.floor(Math.random() * (difficulty[title]?.range || 10)) + 1);
    setUserAnswer('');
  }, [title]);

  const checkAnswer = () => {
    const correctAnswer = num1 + num2;
    if (parseInt(userAnswer) === correctAnswer) {
      setScore(score + 1);
      Alert.alert('Correct!', `Your answer is right! The correct answer is ${correctAnswer}`);
    } else {
      Alert.alert('Incorrect!', `The correct answer was ${correctAnswer}. Try again.`);
    }

    // Generate new question after answering
    setNum1(Math.floor(Math.random() * (difficulty[title]?.range || 10)) + 1);
    setNum2(Math.floor(Math.random() * (difficulty[title]?.range || 10)) + 1);
    setUserAnswer('');
  };

  return (
    <View style={styles.container}>
      {/* Back Button */}
      <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
        <Ionicons name="arrow-back" size={30} color="#567396" />
      </TouchableOpacity>

      <View style={styles.card}>
        {/* Question as the Title */}
        <Text style={styles.question}>What is {num1} + {num2}?</Text>

        {/* Answer Input */}
        <TextInput
          style={styles.input}
          keyboardType="numeric"
          value={userAnswer}
          onChangeText={setUserAnswer}
          placeholder="Enter your answer"
          placeholderTextColor="#888"
        />

        {/* Submit Answer Button */}
        <TouchableOpacity style={styles.submitButton} onPress={checkAnswer}>
          <Text style={styles.submitButtonText}>Submit Answer</Text>
        </TouchableOpacity>
      </View>

      {/* Score */}
      <View style={styles.scoreContainer}>
        <Text style={styles.score}>Score: {score}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F4F7FC',
    paddingHorizontal: 20,
  },
  backButton: {
    position: 'absolute',
    top: 60, // Position it towards the top
    left: 20, // Position it on the left side
    zIndex: 10, // Ensure the back button is on top of other elements
  },
  card: {
    width: '90%',
    backgroundColor: '#fff',
    borderRadius: 15,
    padding: 25,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    marginBottom: 20,
  },
  question: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#567396',
    marginBottom: 25,  // Increased spacing for clarity
    textAlign: 'center',
  },
  input: {
    width: '100%',
    padding: 12,
    marginVertical: 15,
    borderWidth: 1,
    borderRadius: 8,
    borderColor: '#ccc',
    textAlign: 'center',
    fontSize: 18,
    color: '#333',
    backgroundColor: '#f9f9f9',
  },
  submitButton: {
    backgroundColor: '#567396',
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 25,
    marginTop: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 6,
  },
  submitButtonText: {
    fontSize: 18,
    color: '#fff',
    fontWeight: 'bold',
  },
  scoreContainer: {
    marginTop: 20,
    padding: 15,
    backgroundColor: '#567396',
    borderRadius: 10,
    width: '80%',
    alignItems: 'center',
  },
  score: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#fff',
  },
});

export default AdditionGameLevelScreen;
