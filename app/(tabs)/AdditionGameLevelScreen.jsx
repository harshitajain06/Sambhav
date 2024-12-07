import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, Alert, StyleSheet } from 'react-native';

const AdditionGameLevelScreen = ({ route }) => {
  const { level } = route.params; // Get the level from the navigation parameters

  // Set up the difficulty based on the level
  const [num1, setNum1] = useState(Math.floor(Math.random() * (level === 'Level 1' ? 10 : 50)) + 1);
  const [num2, setNum2] = useState(Math.floor(Math.random() * (level === 'Level 1' ? 10 : 50)) + 1);
  const [userAnswer, setUserAnswer] = useState('');

  const checkAnswer = () => {
    const correctAnswer = num1 + num2;
    if (parseInt(userAnswer) === correctAnswer) {
      Alert.alert('Correct!', `You got it right! The answer is ${correctAnswer}.`);
      setNum1(Math.floor(Math.random() * 10) + 1);
      setNum2(Math.floor(Math.random() * 10) + 1);
      setUserAnswer('');
    } else {
      Alert.alert('Incorrect!', 'Please try again.');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{level}</Text>
      <Text style={styles.question}>
        What is {num1} + {num2}?
      </Text>
      <TextInput
        style={styles.input}
        keyboardType="numeric"
        value={userAnswer}
        onChangeText={setUserAnswer}
        placeholder="Enter your answer"
      />
      <Button title="Submit Answer" onPress={checkAnswer} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#DCE9FE',
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#567396',
    marginBottom: 20,
  },
  question: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 20,
  },
  input: {
    width: '100%',
    padding: 10,
    marginVertical: 15,
    borderWidth: 1,
    borderRadius: 5,
    borderColor: '#ccc',
    textAlign: 'center',
    fontSize: 18,
  },
});

export default AdditionGameLevelScreen;
