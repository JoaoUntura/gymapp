import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, Button, ScrollView, StyleSheet, TouchableOpacity, Modal } from 'react-native';

        
function Form (props){
    const[nome,setNome] = useState("")
    const[senha,setSenha] = useState("")
    const[error, setError] = useState("")


    const handleChangeNome = (texto) => {
        if (texto.includes(' ')){
            setError("O nome do usuário não pode incluir espaços  !")
            setNome(texto)
        }
        
        else{
            setError('')
            setNome(texto)
        }
    }

    const handleSubmit = (nome,senha) => {
        if (nome === "" || senha === ""){
            setError("Campos vazios!")
        
        }else if (nome.includes(' ')||senha.includes(' ')){
            setError("Usuário ou senha possui espaços!")
        }else{
            props.submitUser(nome,senha)
        }
        
    }

    return(
        <ScrollView style={styles.page}>
            <Text style={styles.titulo_text} >{props.titulo}</Text>
            <View style={styles.container_input}>
            <TextInput style={styles.input} onChangeText={texto => handleChangeNome(texto)} placeholder="Nome"></TextInput>
            {error ? <Text style={styles.text_error}>{error}</Text>: null}
            <TextInput  style={styles.input} onChangeText={texto => setSenha(texto)} placeholder="Senha"></TextInput>
            </View>
            <TouchableOpacity style={styles.button} onPress={() => handleSubmit(nome,senha)}><Text>Enviar</Text></TouchableOpacity>
            {props.resposta ?<Text style={styles.text_error}>{props.resposta}</Text>: null}
        </ScrollView>
    );

}

const styles = StyleSheet.create({
    //
    page: {
      padding: 30,
      backgroundColor: 'black',
    },
    //
    button: {
        alignItems:'center',
      backgroundColor: '#007BFF',
      paddingVertical: 12,
      paddingHorizontal: 20,
      borderRadius: 5,
      marginTop: 20,
      width:'40vw',
      alignSelf:'center',
      alignContent:'center'
      
    },

    text: {
        fontSize:20,
        marginLeft:10,
        color:'white'
    },
    input:{
        padding:10,
        borderWidth:1,
        borderRadius:10,
        borderColor:'white',
        marginTop:10,
        fontSize:20,
        color:'white',
        placeholderTextColor:"#cacfd9"
    },

    container_input:{
        marginTop:30
    },
    
    titulo_text: {
        fontSize:30,
        marginLeft:10,
        color:'white'
    },

    text_error:{
        fontSize:15,
        marginTop:10,
        color:'red'
    }

  });

export default Form