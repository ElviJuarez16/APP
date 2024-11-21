import React, { useState, useEffect } from 'react';
import { View, ActivityIndicator } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import AsyncStorage from '@react-native-async-storage/async-storage';

// Importación de pantallas
import Inicio from './Screen/inicio';
import Login from './Screen/Login';
import PerfilAlumno from './Screen/Perfilalumno';
import AccountStatus from './Screen/Estadodecuenta';
import RecuperarContrasena from './Screen/recuperarcontraseña';
import CodigoRecuperacion from './Screen/Codigoderecuperacion';
import Listaalumnos from './Screen/listaalumnos';

const Stack = createStackNavigator();

export default function App() {
  const [userType, setUserType] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadUserType = async () => {
      try {
        const storedUserType = await AsyncStorage.getItem('userType');
        setUserType(storedUserType); // Configura el tipo de usuario (admin o user)
      } catch (error) {
        console.log('Error al obtener el tipo de usuario:', error);
      } finally {
        setLoading(false); // Finaliza el proceso de carga
      }
    };

    loadUserType();
  }, []);

  if (loading) {
    // Pantalla de carga mientras se obtiene el tipo de usuario
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" color="#8b4513" />
      </View>
    );
  }

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName={userType === null ? 'Login' : 'Inicio'}>
        {/* Si no hay tipo de usuario, muestra la pantalla de Login */}
        <Stack.Screen name="Inicio" component={Inicio} />
        
        {/* Navegación condicional para admin y user */}
        {userType === 'admin' ? (
          <Stack.Screen name="Admin" component={Listaalumnos} />
        ) : userType === 'user' ? (
          <Stack.Screen name="PerfilAlumno" component={PerfilAlumno} />
        ) : null}

        {/* Pantallas adicionales */}
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="AccountStatus" component={AccountStatus} />
        <Stack.Screen name="Recuperar Contraseña" component={RecuperarContrasena} />
        <Stack.Screen name="Código de Recuperación" component={CodigoRecuperacion} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
