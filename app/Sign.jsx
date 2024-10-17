import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, Button, ScrollView, StyleSheet, TouchableOpacity, Modal } from 'react-native';
import Form from '../components/Form';
import axios from 'axios';
import { Link, useRouter } from 'expo-router';

function Sign (){

    const titulo = "Sign Up"
    
    const router = useRouter();

    const submitUser = async(nome,senha)=>{
        const response =  await axios.post('http://192.168.3.3:8000/novo_user', {nome:nome,senha:senha});
        console.log(response.data)
        router.push("/Login")
    }


    return(
       <>
        <Form titulo={titulo} submitUser={submitUser}></Form>
       </>
    );

}

export default Sign