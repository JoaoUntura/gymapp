// App.js
import React, { useContext, useEffect, useState } from 'react';

import { Link } from 'expo-router';
import { View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import { AuthContext } from '../components/Contexto';


function App (){
    const [login, setLogin] = useState(false)
    const {deleteToken, getToken} = useContext(AuthContext);

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
        setLogin(false);
    }


    const renderLoggedIn = () => (
        <>
            <Text style={styles.text}>Usuário Logado</Text>
            <TouchableOpacity style={styles.button} onPress={logOut}>
                <Text style={styles.buttonText}>Logout</Text>
            </TouchableOpacity>
            <Link style={styles.button} href="/MyCalendar">
                <Text style={styles.buttonText}>Minha Rotina</Text>
            </Link>
            <Link style={styles.button} href="/Personalizado">
                <Text style={styles.buttonText}>Novo Treinamento</Text>
            </Link>
            <Link style={styles.button} href="/Treinamentos">
                <Text style={styles.buttonText}>Treinamentos</Text>
            </Link>
            <Link style={styles.button} href="/GeradorRotina">
                <Text style={styles.buttonText}>Gerador Rotinas</Text>
            </Link>
        </>
    );

    const renderLoggedOut = () => (
        <View style={styles.container}>
            <Link style={styles.button} href="/Login">
                <Text style={styles.buttonText}>Login</Text>
            </Link>
            <Link style={styles.button} href="/Sign">
                <Text style={styles.buttonText}>Sign</Text>
            </Link>
        </View>
    );

    return (
        <View style={styles.page}>
            {login ? renderLoggedIn() : renderLoggedOut()}

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


export default App
