import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomePage from './HomePage';
import GamesPage from './GamesPage';
import RegisterScreen from './Register';
import Login from './Login';
import AdditionGameLevelScreen from './AdditionGameLevelScreen';
import LearnChessLevelScreen from './LearnChessLevelScreen'; // New Learn Chess Level Screen
import SolvePuzzlesLevelScreen from './SolvePuzzlesLevelScreen'; // New Solve Puzzles Level Screen
import MatchGameScreen from './MatchGameScreen'; // New Match Game Screen
import { Colors } from '../../constants/Colors';
import { useColorScheme } from '../../hooks/useColorScheme';
import { Ionicons } from '@expo/vector-icons';
import { signOut } from 'firebase/auth';
import { auth } from '../../config/firebase';
import { useNavigation } from '@react-navigation/native';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();
const Drawer = createDrawerNavigator();

const BottomTabs = () => {
  const colorScheme = useColorScheme();

  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarActiveTintColor: Colors[colorScheme ?? 'light'].tint,
        tabBarInactiveTintColor: 'gray',
        tabBarStyle: { backgroundColor: Colors[colorScheme ?? 'light'].background },
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;
          if (route.name === 'Home') {
            iconName = focused ? 'home' : 'home-outline';
          } else if (route.name === 'Games') {
            iconName = focused ? 'game-controller' : 'game-controller-outline';
          }
          return <Ionicons name={iconName} size={size} color={color} />;
        },
      })}
    >
      <Tab.Screen name="Home" component={HomePage} />
      <Tab.Screen name="Games" component={GamesPage} />
    </Tab.Navigator>
  );
};

const DrawerNavigator = () => {
  const navigation = useNavigation();

  const handleLogout = () => {
    signOut(auth)
      .then(() => {
        navigation.replace('Login');
      })
      .catch((err) => {
        console.error('Logout Error:', err);
        Alert.alert('Error', 'Failed to logout. Please try again.');
      });
  };

  return (
    <Drawer.Navigator initialRouteName="MainTabs">
      <Drawer.Screen name="MainTabs" component={BottomTabs} options={{ title: 'Home' }} />
      <Drawer.Screen
        name="Logout"
        component={BottomTabs} // Not navigating to any screen
        options={{
          title: 'Logout',
          drawerIcon: ({ color, size }) => (
            <Ionicons name="log-out-outline" size={size} color={color} />
          ),
        }}
        listeners={{
          drawerItemPress: (e) => {
            e.preventDefault();
            handleLogout();
          },
        }}
      />
    </Drawer.Navigator>
  );
};

export default function StackLayout() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      {/* Authentication Screens */}
      <Stack.Screen name="Login" component={Login} />
      <Stack.Screen name="Register" component={RegisterScreen} />

      {/* Main App with Drawer Navigator */}
      <Stack.Screen name="Drawer" component={DrawerNavigator} />

      {/* Game Level Screens */}
      <Stack.Screen name="AdditionGameLevel" component={AdditionGameLevelScreen} />
      <Stack.Screen name="LearnChessLevel" component={LearnChessLevelScreen} />
      <Stack.Screen name="SolvePuzzlesLevel" component={SolvePuzzlesLevelScreen} />

      {/* Match Game Screen */}
      <Stack.Screen name="MatchGameScreen" component={MatchGameScreen} />
    </Stack.Navigator>
  );
}
