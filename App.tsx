import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import LoginScreen from './Screens/LoginScreen';
import RegistroScreen from './Screens/RegistroScreen';
import MenuScreen from './Screens/MenuScreen';
import TestScreen from './Screens/TestScreen';
import NivelesScreen from './Screens/NivelesScreen';
import MensajesScreen from './Screens/MensajesScreen';
import MsgScreen from './Screens/MsgScreen';
import InformacionScreen from './Screens/InformacionScreen';
import PuntuacionScreen from './Screens/PuntuacionScreen';
import ExamenScreen from './Screens/ExamenScreen';
import ActualizaScreen from './Screens/ActualizaScreen';
import GamesScreen from './Screens/GamesScreen';
import GameSumGuessingGameScreen from './Screens/GameSumGuessingGameScreen';
import ScratchGame from './Screens/ScratchGame';
const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login">
        <Stack.Screen name="Login" component={LoginScreen} options={{ headerShown: false }}/>
        <Stack.Screen name="Registro" component={RegistroScreen}options={{ headerShown: false }} />
        <Stack.Screen name="Menu" component={MenuScreen} options={{ headerShown: false }} />
        <Stack.Screen name="Test" component={TestScreen} />
        <Stack.Screen name="Niveles" component={NivelesScreen} />
        <Stack.Screen name="Mensajes" component={MensajesScreen} />
        <Stack.Screen name="Msg" component={MsgScreen} options={{ headerShown: false }}/>
        <Stack.Screen name="Informacion" component={InformacionScreen} options={{ headerShown: false }} />
        <Stack.Screen name="Puntuacion" component={PuntuacionScreen}  options={{ headerShown: false }} />
        <Stack.Screen name="Examen" component={ExamenScreen}  />
        <Stack.Screen name="Actualiza" component={ActualizaScreen} options={{ headerShown: false }} />
        <Stack.Screen name="Juegos" component={GamesScreen} />
        <Stack.Screen name="GameSumGuessingGameScreen" component={GameSumGuessingGameScreen}  options={{ headerShown: false }}/>
        <Stack.Screen name="Game" component={ScratchGame}  />

      </Stack.Navigator>
    </NavigationContainer>
  );
}