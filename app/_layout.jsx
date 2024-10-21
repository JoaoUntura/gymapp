import { Slot } from 'expo-router';
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
