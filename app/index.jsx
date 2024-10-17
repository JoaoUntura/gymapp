// App.js
import React, { useContext, useEffect, useState } from 'react';

import { Link } from 'expo-router';
import NovoTreinamento from './NovoTreinamento';
import { View, Text, TextInput, Button, ScrollView, StyleSheet, TouchableOpacity, Modal } from 'react-native';
import { AuthContext } from '../components/Contexto';

function App (){
    const [login, setLogin] = useState(false)
    const {username, setUserName, deleteToken, getToken} = useContext(AuthContext);

    useEffect(() => {
        const checkToken = async () => {
            const token = await getToken(); 
            console.log(token);
            if (token) {
                setLogin(true);
            } else {
                setLogin(false);
            }
        };
    
        checkToken();
    }, []);

    const logOut = () =>{
        deleteToken();
        setUserName("Nenhum");
        setLogin(false)
    }


    return (
            <View style={styles.page}>
                <Text style={styles.text}>Usuário Logado: {username}</Text>
                {login && <TouchableOpacity style={styles.button} onPress={logOut}><Text>Logout</Text></TouchableOpacity>}
                <View style={styles.container} >
                <Link style={styles.button} href="/Login">Login</Link>
                <Link style={styles.button} href="/Sign">Sign</Link>
                {login && <><Link style={styles.button} href="/NovoTreinamento">Novo Treinamento</Link>
                <Link  style={styles.button} href="/Treinamentos">Treinamentos</Link></> }
                
                </View>
            </View>   
    );
};

const styles = StyleSheet.create({
    //
    page: {
        flex:1,
      padding: 20,
      paddingTop:60,
      backgroundColor: 'black',
      alignItems:'center'
    },
    //
    button: {
        textAlign:'center',
      backgroundColor: '#007BFF',
      paddingVertical: 12,
      paddingHorizontal: 20,
      borderRadius: 5,
      marginTop: 20,
      width: 300,
      alignSelf:'center',
      alignContent:'center',
      fontSize:20,
      color:'white'
      
    },

    text: {
        fontSize:20,
      
        color:'white'
    },

    container: {
        marginTop:70
    },
    

  });


export default App;
