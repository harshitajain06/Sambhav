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
];

const GamesPage = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedLevels, setSelectedLevels] = useState([]);
  const navigation = useNavigation();

  const handleGamePress = (game) => {
    if (game.title === 'Addition Game') {
      setSelectedLevels(game.levels || []);
      setModalVisible(true);
    } else {
      setSelectedLevels(game.levels || []);
      setModalVisible(true);
    }
  };

  const handleLevelSelect = (level) => {
    // Navigate to the Addition Game with selected level
    navigation.navigate('AdditionGameLevel', { level });
    setModalVisible(false);
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
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Levels</Text>
            <FlatList
              data={selectedLevels}
              renderItem={({ item }) => (
                <Pressable
                  style={styles.levelCard}
                  onPress={() => handleLevelSelect(item)}
                >
                  {/* Make sure we are rendering title and icon properly */}
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
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#DCE9FE',
    paddingHorizontal: 20,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#567396',
    marginVertical: 10,
  },
  cardList: {
    paddingBottom: 20,
  },
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 10,
    marginBottom: 15,
    padding: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  cardImage: {
    width: 50,
    height: 50,
    borderRadius: 10,
    marginRight: 15,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    width: '90%',
    backgroundColor: '#fff',
    borderRadius: 15,
    padding: 25,
    alignItems: 'center',
    elevation: 10,
  },
  modalTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#567396',
    marginBottom: 20,
  },
  levelList: {
    justifyContent: 'center',
    paddingBottom: 20,
  },
  levelCard: {
    flex: 1,
    alignItems: 'center',
    marginVertical: 10,
    marginHorizontal: 15,
    backgroundColor: '#f2f2f2',
    padding: 15,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 4,
  },
  iconWrapper: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#567396',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 5,
  },
  levelText: {
    fontSize: 16,
    color: '#333',
    textAlign: 'center',
  },
  closeButton: {
    marginTop: 25,
    backgroundColor: '#567396',
    borderRadius: 10,
    paddingVertical: 12,
    paddingHorizontal: 20,
  },
  closeButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default GamesPage;
