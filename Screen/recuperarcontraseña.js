import React, { useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, Alert } from 'react-native';

export default function Recuperarcontraseña({ navigation }) {
  const [email, setEmail] = useState('');

  const validateEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  const handleSendLink = () => {
    if (!email) {
      Alert.alert('Error', 'Por favor, ingresa tu correo electrónico.');
    } else if (!validateEmail(email)) {
      Alert.alert('Error', 'Por favor, ingresa un correo electrónico válido.');
    } else {

      Alert.alert('Éxito', 'Se ha enviado un enlace de recuperación a tu correo.');
      navigation.navigate('Código de Recuperación'); 
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>Recuperar Contraseña</Text>
      <Text style={styles.subtitulo}>
        Ingresa tu correo electrónico para restablecer tu contraseña
      </Text>
      <TextInput
        placeholder="Correo Electrónico"
        style={styles.Entrada}
        keyboardType="email-address"
        autoCapitalize="none"
        value={email}
        onChangeText={setEmail}
      />

      <TouchableOpacity style={styles.boton} onPress={handleSendLink}>
        <Text style={styles.botonTexto}>Enviar Enlace</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.botonVolver}
        onPress={() => navigation.navigate('Login')}
      >
        <Text style={styles.botonVolverTexto}>Volver al Inicio de Sesión</Text>
      </TouchableOpacity>

      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#d3d3d3',
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 60,
  },
  titulo: {
    fontSize: 32,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  subtitulo: {
    fontSize: 18,
    color: '#777',
    textAlign: 'center',
    paddingHorizontal: 30,
    marginBottom: 20,
  },
  Entrada: {
    width: '80%',
    height: 40,
    marginTop: 15,
    padding: 10,
    borderRadius: 20,
    backgroundColor: '#fff',
  },
  boton: {
    backgroundColor: '#007BFF',
    padding: 10,
    borderRadius: 20,
    marginTop: 20,
    width: '80%',
    alignItems: 'center',
  },
  botonTexto: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  botonVolver: {
    marginTop: 10,
  },
  botonVolverTexto: {
    color: '#007BFF',
    fontSize: 16,
    textDecorationLine: 'underline',
  },
});
