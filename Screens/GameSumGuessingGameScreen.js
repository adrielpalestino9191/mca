import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, Alert, ScrollView } from 'react-native';

const GameSumGuessingGameScreen = () => {
  const [factor1, setFactor1] = useState('');
  const [factor2, setFactor2] = useState('');
  const [result, setResult] = useState('');
  const [correctAnswer, setCorrectAnswer] = useState(0);
  const [operation, setOperation] = useState('Suma');

  useEffect(() => {
    generateQuestion();
  }, [operation]);

  const generateQuestion = () => {
    const num1 = Math.floor(Math.random() * 10) + 1;
    const num2 = Math.floor(Math.random() * 10) + 1;
    let randomResult;
    switch (operation) {
      case 'Suma':
        randomResult = num1 + num2;
        break;
      case 'Resta':
        randomResult = num1 - num2;
        break;
      case 'Multiplicación':
        randomResult = num1 * num2;
        break;
      case 'División':
        randomResult = num1 / num2;
        break;
      default:
        randomResult = num1 + num2;
    }

    setFactor1('');
    setFactor2('');
    setCorrectAnswer(randomResult);
    setResult(randomResult.toString());
  };

  const checkAnswer = () => {
    const userResult = operation === 'División' ? parseFloat(factor1) / parseFloat(factor2) : parseInt(factor1) + parseInt(factor2);
    if (userResult === correctAnswer) {
      Alert.alert('¡Correcto!', '¡Has acertado la respuesta!');
    } else {
      Alert.alert('Incorrecto', 'La respuesta no es correcta. ¡Inténtalo de nuevo!');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Adivinador de Operaciones</Text>
      <View style={styles.operationSelector}>
        <TouchableOpacity
          style={[styles.operationButton, operation === 'Suma' && styles.selectedOperation]}
          onPress={() => setOperation('Suma')}>
          <Text style={styles.operationButtonText}>Suma</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.operationButton, operation === 'Resta' && styles.selectedOperation]}
          onPress={() => setOperation('Resta')}>
          <Text style={styles.operationButtonText}>Resta</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.operationButton, operation === 'Multiplicación' && styles.selectedOperation]}
          onPress={() => setOperation('Multiplicación')}>
          <Text style={styles.operationButtonText}>Multiplicación</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.operationButton, operation === 'División' && styles.selectedOperation]}
          onPress={() => setOperation('División')}>
          <Text style={styles.operationButtonText}>División</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.table}>
        <View style={styles.row}>
          <Text style={styles.label}>Factor 1:</Text>
          <TextInput
            style={styles.input}
            keyboardType="numeric"
            placeholder="Factor 1"
            value={factor1}
            onChangeText={text => setFactor1(text)}
          />
        </View>
        <View style={styles.row}>
          <Text style={styles.label}>Operación:</Text>
          <Text style={styles.operationSign}>{operation === 'Multiplicación' ? 'x' : (operation === 'División' ? '÷' : (operation === 'Suma' ? "+" : "-"))}</Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.label}>Factor 2:</Text>
          <TextInput
            style={styles.input}
            keyboardType="numeric"
            placeholder="Factor 2"
            value={factor2}
            onChangeText={text => setFactor2(text)}
          />
        </View>
        <View style={styles.row}>
          <Text style={styles.label}>Resultado:</Text>
          <TextInput
            style={styles.input}
            keyboardType="numeric"
            placeholder="Resultado"
            value={result}
            onChangeText={text => setResult(text)}
            editable={false}
          />
        </View>
      </View>
      <TouchableOpacity style={styles.checkButton} onPress={checkAnswer}>
        <Text style={styles.checkButtonText}>Comprobar</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.nextButton} onPress={generateQuestion}>
        <Text style={styles.nextButtonText}>Siguiente Pregunta</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  operationSelector: {
    flexDirection: 'row',
    marginBottom: 20,
  },
  operationButton: {
    backgroundColor: '#00bcd4',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    marginRight: 10,
  },
  selectedOperation: {
    backgroundColor: '#4caf50',
  },
  operationButtonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#fff',
  },
  table: {
    borderWidth: 1,
    borderColor: '#333',
    borderRadius: 5,
    marginBottom: 20,
    paddingHorizontal: 10,
    paddingVertical: 10,
    width: '100%',
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  label: {
    marginRight: 10,
    fontSize: 16,
    fontWeight: 'bold',
  },
  input: {
    flex: 1,
    height: 40,
    borderWidth: 1,
    borderColor: '#333',
    borderRadius: 5,
    paddingHorizontal: 10,
  },
  operationSign: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  checkButton: {
    backgroundColor: '#00bcd4',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
  },
  checkButtonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#fff',
  },
  nextButton: {
    backgroundColor: '#4caf50',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
  },
  nextButtonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#fff',
  },
});

export default GameSumGuessingGameScreen;
