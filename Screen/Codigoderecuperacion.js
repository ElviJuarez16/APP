import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, KeyboardAvoidingView, Platform, ScrollView } from 'react-native';

export default function IngresarCodigoRecuperacion({ navigation }) {
  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'} 
    >
      <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.titulo}>Código de Recuperación</Text>
        <Text style={styles.subtitulo}>
          Ingresa el código de recuperación enviado a tu correo electrónico
        </Text>

        <TextInput
          placeholder="Código de Recuperación"
          style={styles.Entrada}
          keyboardType="numeric"
          maxLength={6}
        />

        <TouchableOpacity style={styles.boton}>
          <Text style={styles.botonTexto}>Verificar Código</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.botonVolver}
          onPress={() => navigation.navigate('Recuperar Contraseña')}
        >
          <Text style={styles.botonVolverTexto}>Volver a Recuperar Contraseña</Text>
        </TouchableOpacity>

        <StatusBar style="auto" />
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1, 
    backgroundColor: '#d3d3d3',
    alignItems: 'center',
    justifyContent: 'flex-start', 
    paddingTop: 60,
    paddingBottom: 20, 
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
    textAlign: 'center',
    fontSize: 18,
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
