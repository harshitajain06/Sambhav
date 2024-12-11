import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Image,
  Modal,
  Pressable,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

const gamesData = [
  {
    id: '1',
    title: 'Learn Chess',
    image: require('../../assets/images/Logo.png'),
    levels: [
      { id: '1', title: 'Level 1: Opening', icon: 'heart-outline' },
      { id: '2', title: 'Level 2: Midgame', icon: 'flag-outline' },
      { id: '3', title: 'Level 3: Endgame', icon: 'cog-outline' },
    ],
  },
  {
    id: '2',
    title: 'Solve Puzzles',
    image: require('../../assets/images/Logo.png'),
    levels: [
      { id: '1', title: 'Level 1: Easy', icon: 'happy-outline' },
      { id: '2', title: 'Level 2: Medium', icon: 'help-circle-outline' },
      { id: '3', title: 'Level 3: Hard', icon: 'skull-outline' },
    ],
  },
  {
    id: '3',
    title: 'Addition Game',
    image: require('../../assets/images/Logo.png'),
    levels: [
      { id: '1', title: 'Level 1: Basic Addition', icon: 'add-circle-outline' },
      { id: '2', title: 'Level 2: Intermediate Addition', icon: 'add-circle' },
      { id: '3', title: 'Level 3: Advanced Addition', icon: 'add' },
    ],
  },
  {
    id: '4',
    title: 'Match Game', // New Match Game entry
    image: require('../../assets/images/Logo.png'),
    levels: [], // No levels for Match Game
  },
];

const GamesPage = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedLevels, setSelectedLevels] = useState([]);
  const [selectedGame, setSelectedGame] = useState(null);
  const navigation = useNavigation();

  const handleGamePress = (game) => {
    if (game.levels && game.levels.length > 0) {
      // Game has levels
      setSelectedGame(game);
      setSelectedLevels(game.levels);
      setModalVisible(true);
    } else {
      // Game does not have levels, navigate directly
      navigation.navigate(`${game.title.replace(/\s+/g, '')}Screen`); // e.g., 'MatchGameScreen'
    }
  };

  const handleLevelSelect = (level) => {
    if (selectedGame) {
      // Dynamically navigate based on the selected game
      const gameTitle = selectedGame.title.replace(/\s+/g, '');
      navigation.navigate(`${gameTitle}Level`, { level });
      setModalVisible(false);
    }
  };

  const renderGameCard = ({ item }) => (
    <TouchableOpacity
      style={styles.card}
      onPress={() => handleGamePress(item)}
    >
      <Image source={item.image} style={styles.cardImage} />
      <Text style={styles.cardTitle}>{item.title}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.sectionTitle}>Games</Text>
      <FlatList
        data={gamesData}
        renderItem={renderGameCard}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.cardList}
        showsVerticalScrollIndicator={false}
      />

      {/* Modal for Levels */}
      {selectedGame && selectedGame.levels.length > 0 && (
        <Modal
          animationType="slide"
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => setModalVisible(false)}
        >
          <View style={styles.modalOverlay}>
            <View style={styles.modalContent}>
              <Text style={styles.modalTitle}>Select Level</Text>
              <FlatList
                data={selectedLevels}
                renderItem={({ item }) => (
                  <Pressable
                    style={styles.levelCard}
                    onPress={() => handleLevelSelect(item)}
                  >
                    <View style={styles.iconWrapper}>
                      <Ionicons name={item.icon} size={30} color="#fff" />
                    </View>
                    <Text style={styles.levelText}>{item.title}</Text>
                  </Pressable>
                )}
                keyExtractor={(item) => item.id}
                horizontal={true}
                contentContainerStyle={styles.levelList}
                showsHorizontalScrollIndicator={false}
              />
              <Pressable
                style={styles.closeButton}
                onPress={() => setModalVisible(false)}
              >
                <Text style={styles.closeButtonText}>Close</Text>
              </Pressable>
            </View>
          </View>
        </Modal>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#DCE9FE',
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  sectionTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#567396',
    marginBottom: 20,
    textAlign: 'center',
  },
  cardList: {
    paddingBottom: 20,
  },
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 15,
    marginBottom: 20,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.15,
    shadowRadius: 6,
    elevation: 4,
  },
  cardImage: {
    width: 60,
    height: 60,
    borderRadius: 15,
    marginRight: 20,
  },
  cardTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    width: '85%',
    backgroundColor: '#fff',
    borderRadius: 20,
    padding: 30,
    alignItems: 'center',
    elevation: 20,
  },
  modalTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#567396',
    marginBottom: 25,
  },
  levelList: {
    justifyContent: 'center',
    paddingBottom: 20,
  },
  levelCard: {
    alignItems: 'center',
    marginHorizontal: 10,
    backgroundColor: '#567396',
    padding: 20,
    borderRadius: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 3,
  },
  iconWrapper: {
    width: 70,
    height: 70,
    borderRadius: 35,
    backgroundColor: '#333',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
  },
  levelText: {
    fontSize: 18,
    color: '#fff',
    textAlign: 'center',
  },
  closeButton: {
    marginTop: 20,
    backgroundColor: '#567396',
    borderRadius: 10,
    paddingVertical: 12,
    paddingHorizontal: 25,
  },
  closeButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default GamesPage;
