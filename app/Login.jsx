import React, { useContext, useEffect, useState } from 'react';
import { View, Text, TextInput, Button, ScrollView, StyleSheet, TouchableOpacity, Modal } from 'react-native';
import Form from '../components/Form';
import axios from 'axios';
import { Link, useRouter } from 'expo-router';
import { AuthContext } from '../components/Contexto';


function Login (){
    const [resposta,setResposta] = useState("")
    const {getToken, storeToken,username,setUserName} = useContext(AuthContext);

    const titulo = "Login";
    
    const router = useRouter();

    const submitUser = async(nome,senha)=>{
        const response =  await axios.post('http://192.168.3.3:8000/check_user', {nome:nome,senha:senha});
        setResposta(response.data.message)

        if(response.data.token){
            await storeToken(response.data.token)
            setUserName(response.data.username)
            router.push('/')
        }

    }


    return(
       <>
        <Form titulo={titulo} submitUser={submitUser} resposta={resposta}></Form>
       </>
    );

}

export default Login