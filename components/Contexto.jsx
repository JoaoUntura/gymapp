import React, { createContext, useState } from 'react';
import * as SecureStore from 'expo-secure-store';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {

  const [username,setUserName] = useState("")

    const storeToken = async(newToken) =>{
        await SecureStore.setItemAsync("userToken", newToken)
        console.log('Token armazenado com sucesso!');
    }
    
    const getToken = async () => {
        try {
            const storedToken = await SecureStore.getItemAsync("userToken");
            return storedToken
        } catch (error) {
            console.error("Erro ao recuperar o token:", error);
            return null
        }
    };

    const deleteToken = async () =>{
      await SecureStore.deleteItemAsync("userToken")
    }

  return (
    <AuthContext.Provider value={{ getToken, storeToken,deleteToken,username,setUserName }}>
      {children}
    </AuthContext.Provider>
  );
};

