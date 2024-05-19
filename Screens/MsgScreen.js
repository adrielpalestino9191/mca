import React from 'react';
import { View, Text, StyleSheet, ScrollView, ImageBackground } from 'react-native';

const MsgScreen = ({ route }) => {
  const { messageContent } = route.params;

  return (
    <ImageBackground
      source={require('../assets/lectura.jpeg')}
      style={styles.fondo}
      resizeMode="cover"
    >
      <View style={styles.container}>
        <ScrollView contentContainerStyle={styles.scrollViewContent}>
          <View style={styles.msgContainer}>
            <View style={styles.balloon}>
              <Text style={styles.balloonText}>{messageContent}</Text>
            </View>
          </View>
        </ScrollView>
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  fondo: {
    flex: 1,
    resizeMode: 'cover',
    justifyContent: 'center',
  },
  container: {
    flex: 1,
    padding: 20,
  },
  scrollViewContent: {
    flexGrow: 1,
    justifyContent: 'flex-end',
  },
  msgContainer: {
    marginTop: 20,
    backgroundColor: '#e6f2ff',
    padding: 10,
    borderRadius: 10,
    maxWidth: '80%',
  },
  balloon: {
    backgroundColor: '#b3d9ff',
    borderRadius: 10,
    paddingHorizontal: 15,
    paddingVertical: 10,
  },
  balloonText: {
    color: '#000',
  },
  fechaHora: {
    marginTop: 5,
    color: '#666',
    textAlign: 'right',
  },
});

export default MsgScreen;
