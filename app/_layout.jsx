import { Slot } from 'expo-router';
import { View, Text, TextInput, Button, ScrollView, StyleSheet, TouchableOpacity, Modal } from 'react-native';
import {AuthProvider} from '../components/Contexto';

export default function HomeLayout() {
  
  return (
    <>
    <AuthProvider>
        <Slot />
    </AuthProvider> 
    </>
  );
}
