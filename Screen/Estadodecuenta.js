import React from 'react'; 
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';

const EstadoDeCuenta = ({ navigation }) => {
    const recentTransactions = [
        { id: 1, date: '01/11/2024', description: 'Cuota Noviembre', amount: -15000 },
        { id: 2, date: '01/10/2026', description: 'Cuota Octubre', amount: -15000 },
        { id: 3, date: '01/11/2024', description: 'Compra en línea', amount: -120.00 },
    ];

    return (
        <ScrollView contentContainerStyle={styles.container}>
            <Text style={styles.title}>Estado de Cuenta</Text>
            <Text style={styles.subtitle}>Transacciones recientes:</Text>
            {recentTransactions.map((transaction) => (
                <View key={transaction.id} style={styles.transaction}>
                    <Text style={styles.transactionText}>
                        {transaction.date} - {transaction.description}
                    </Text>
                    <Text
                        style={
                            transaction.amount < 0 ? styles.negativeAmount : styles.positiveAmount
                        }
                    >
                        ${Math.abs(transaction.amount).toFixed(2)} ARS
                    </Text>
                </View>
            ))}

            <TouchableOpacity style={styles.button} onPress={() => navigation.goBack()}>
                <Text style={styles.buttonText}>Volver al Perfil</Text>
            </TouchableOpacity>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: '#8b4513',
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#f5f5dc',
        marginBottom: 20,
        textAlign: 'center',
    },
    subtitle: {
        fontSize: 18,
        color: '#f5f5dc',
        fontWeight: 'bold',
        marginBottom: 10,
    },
    transaction: {
        padding: 15,
        borderBottomWidth: 1,
        borderBottomColor: '#f5f5dc',
        marginBottom: 10,
    },
    transactionText: {
        fontSize: 16,
        color: '#f5f5dc',
    },
    negativeAmount: {
        color: 'red',
        fontWeight: 'bold',
        marginTop: 5,
    },
    positiveAmount: {
        color: 'green',
        fontWeight: 'bold',
        marginTop: 5,
    },
    button: {
        backgroundColor: '#1e90ff',
        padding: 10,
        borderRadius: 10,
        width: '100%',
        alignItems: 'center',
        marginTop: 30,
    },
    buttonText: {
        color: '#fff',
        fontSize: 18,
        fontWeight: 'bold',
    },
});

// Corrigiendo el nombre del componente exportado
export default EstadoDeCuenta;
