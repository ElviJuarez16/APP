import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Image, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import AsyncStorage from '@react-native-async-storage/async-storage';

const PerfilAlumno = ({ navigation }) => {
  const [image, setImage] = useState(null);
  const [firstName, setFirstName] = useState("Lourdes");
  const [lastName, setLastName] = useState("Cruz");
  const [username, setUsername] = useState("lulycruz");
  const [email, setEmail] = useState("lourdescruz@example.com");
  const [notifications, setNotifications] = useState(false);

  // Solicitar permisos para acceder a la galería
  const requestPermission = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== 'granted') {
      alert('Se requiere permiso para acceder a la galería');
    }
  };

  useEffect(() => {
    requestPermission();
    loadProfile(); // Cargar datos almacenados cuando se monta el componente
  }, []);

  // Cargar los datos de perfil desde AsyncStorage
  const loadProfile = async () => {
    const storedFirstName = await AsyncStorage.getItem('firstName');
    const storedLastName = await AsyncStorage.getItem('lastName');
    const storedUsername = await AsyncStorage.getItem('username');
    const storedEmail = await AsyncStorage.getItem('email');

    if (storedFirstName) setFirstName(storedFirstName);
    if (storedLastName) setLastName(storedLastName);
    if (storedUsername) setUsername(storedUsername);
    if (storedEmail) setEmail(storedEmail);
  };

  // Función para seleccionar una imagen de la galería
  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };

  // Función para cambiar el estado de las notificaciones
  const toggleNotifications = () => {
    setNotifications(!notifications);
  };

  // Función para guardar los cambios de perfil en AsyncStorage
  const handleSave = async () => {
    await AsyncStorage.setItem('firstName', firstName);
    await AsyncStorage.setItem('lastName', lastName);
    await AsyncStorage.setItem('username', username);
    await AsyncStorage.setItem('email', email);
    alert('Perfil actualizado');
  };

  // Función para cerrar sesión
  const handleLogout = async () => {
    await AsyncStorage.clear();  // Eliminar todos los datos almacenados
    navigation.goBack();  // Volver a la pantalla anterior
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {/* Foto de perfil */}
      <TouchableOpacity onPress={pickImage}>
        <Image 
          source={image ? { uri: image } : require('../assets/Portada1.jpeg')} 
          style={styles.profileImage} 
        />
      </TouchableOpacity>

      {/* Campos de texto para editar el perfil */}
      <View style={styles.inputContainer}>
        <Text style={styles.label}>Nombre</Text>
        <TextInput 
          style={styles.input} 
          value={firstName} 
          onChangeText={setFirstName} 
        />
      </View>

      <View style={styles.inputContainer}>
        <Text style={styles.label}>Apellido</Text>
        <TextInput 
          style={styles.input} 
          value={lastName} 
          onChangeText={setLastName} 
        />
      </View>

      <View style={styles.inputContainer}>
        <Text style={styles.label}>Nombre de Usuario</Text>
        <TextInput 
          style={styles.input} 
          value={username} 
          onChangeText={setUsername} 
        />
      </View>

      <View style={styles.inputContainer}>
        <Text style={styles.label}>Correo Electrónico</Text>
        <TextInput 
          style={styles.input} 
          value={email} 
          onChangeText={setEmail} 
          keyboardType="email-address" 
        />
      </View>

      {/* Botón para guardar los cambios */}
      <TouchableOpacity style={styles.button} onPress={handleSave}>
        <Text style={styles.buttonText}>Guardar Cambios</Text>
      </TouchableOpacity>

      {/* Cambiar el estado de las notificaciones */}
      <View style={styles.notificationContainer}>
        <Text style={styles.notificationText}>Notificaciones</Text>
        <TouchableOpacity 
          style={styles.button} 
          onPress={toggleNotifications}
        >
          <Text style={styles.buttonText}>
            {notifications ? 'Desactivar Notificaciones' : 'Activar Notificaciones'}
          </Text>
        </TouchableOpacity>
      </View>

      {/* Opción para cerrar sesión */}
      <TouchableOpacity style={styles.linkButton} onPress={handleLogout}>
        <Text style={styles.linkButtonText}>Cerrar Sesión</Text>
      </TouchableOpacity>

      {/* Opción para ver el estado de cuenta */}
      <TouchableOpacity style={styles.linkButton} onPress={() => navigation.navigate('AccountStatus')}>
        <Text style={styles.linkButtonText}>Ver Estado de Cuenta</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#8b4513',
  },
  profileImage: {
    width: 120,
    height: 120,
    borderRadius: 60,
    marginBottom: 20,
    borderWidth: 2,
    borderColor: '#f5f5dc',
  },
  inputContainer: {
    width: '100%',
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#f5f5dc',
    marginBottom: 5,
  },
  input: {
    width: '100%',
    height: 40,
    borderColor: '#f5f5dc',
    borderWidth: 1,
    borderRadius: 10,
    paddingHorizontal: 10,
    backgroundColor: '#fff',
  },
  button: {
    backgroundColor: '#1e90ff',
    padding: 10,
    borderRadius: 10,
    width: '100%',
    alignItems: 'center',
    marginTop: 20,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  linkButton: {
    marginTop: 10,
  },
  linkButtonText: {
    color: '#007BFF',
    fontSize: 16,
    textDecorationLine: 'underline',
    textAlign: 'center',
  },
  notificationContainer: {
    marginTop: 20,
    alignItems: 'center',
  },
  notificationText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#f5f5dc',
    marginBottom: 5,
  },
});

export default PerfilAlumno;
