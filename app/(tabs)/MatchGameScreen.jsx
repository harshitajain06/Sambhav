import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, Alert, StyleSheet, FlatList } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const initialCardData = [
  { id: 1, value: 'A', matched: false },
  { id: 2, value: 'B', matched: false },
  { id: 3, value: 'C', matched: false },
  { id: 4, value: 'D', matched: false },
  { id: 5, value: 'A', matched: false },
  { id: 6, value: 'B', matched: false },
  { id: 7, value: 'C', matched: false },
  { id: 8, value: 'D', matched: false },
];

const MatchGameScreen = () => {
    const navigation = useNavigation();
  const [cards, setCards] = useState([]);
  const [flippedIndices, setFlippedIndices] = useState([]);
  const [matchedPairs, setMatchedPairs] = useState([]);
  const [score, setScore] = useState(0);

  useEffect(() => {
    startGame();
  }, []);

  const startGame = () => {
    const shuffledCards = initialCardData
      .map(card => ({ ...card, id: Math.random() })) // Unique ID
      .sort(() => Math.random() - 0.5);
    setCards(shuffledCards);
    setMatchedPairs([]);
    setScore(0);
    setFlippedIndices([]);
  };

  const flipCard = (index) => {
    if (flippedIndices.length === 2 || flippedIndices.includes(index) || cards[index].matched) return;

    const newFlippedIndices = [...flippedIndices, index];
    setFlippedIndices(newFlippedIndices);

    if (newFlippedIndices.length === 2) {
      const [firstIndex, secondIndex] = newFlippedIndices;
      if (cards[firstIndex].value === cards[secondIndex].value) {
        setMatchedPairs(prev => [...prev, cards[firstIndex].value]);
        setScore(score + 1);
        setCards(prevCards => {
          const updatedCards = [...prevCards];
          updatedCards[firstIndex].matched = true;
          updatedCards[secondIndex].matched = true;
          return updatedCards;
        });
        setFlippedIndices([]);
      } else {
        setTimeout(() => setFlippedIndices([]), 1000);
      }
    }
  };

  const renderCard = ({ item, index }) => {
    const isFlipped = flippedIndices.includes(index) || item.matched;
    return (
      <TouchableOpacity
        style={[styles.card, isFlipped && styles.cardFlipped]}
        onPress={() => flipCard(index)}
      >
        <Text style={styles.cardText}>{isFlipped ? item.value : '?'}</Text>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Match Game</Text>
      <Text style={styles.score}>Score: {score}</Text>
      <FlatList
        data={cards}
        renderItem={renderCard}
        keyExtractor={(item) => item.id.toString()}
        numColumns={4}
        contentContainerStyle={styles.cardGrid}
      />
      {matchedPairs.length === initialCardData.length / 2 && (
        <TouchableOpacity style={styles.resetButton} onPress={startGame}>
          <Text style={styles.resetButtonText}>You Win! Play Again</Text>
        </TouchableOpacity>
      )}
      <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
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
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#567396',
    marginBottom: 20,
    marginTop: 50,
  },
  score: {
    fontSize: 20,
    marginBottom: 20,
  },
  cardGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
  },
  card: {
    width: 60,
    height: 60,
    margin: 10,
    backgroundColor: '#f4f4f4',
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  cardFlipped: {
    backgroundColor: '#567396',
  },
  cardText: {
    fontSize: 24,
    color: '#fff',
    fontWeight: 'bold',
  },
  resetButton: {
    marginTop: 30,
    backgroundColor: '#567396',
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 25,
  },
  resetButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  backButton: {
    marginTop: 20,
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

export default MatchGameScreen;
