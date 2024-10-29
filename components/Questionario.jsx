

import { View, Text, TextInput, Button, ScrollView, StyleSheet, TouchableOpacity, Modal} from 'react-native';
import { RadioButton } from 'react-native-paper';
import React, { useContext, useEffect, useState } from 'react';
import { useRouter } from 'expo-router';
import Days from './Days';
import api from '../axios';
import { AuthContext } from '../components/Contexto';



function Questionario (){
    const [objetivo, setObjetivo] = useState(null);
    const [days, setDays] = useState({'Do':false, 'Se':false, 'Te':false, 'Qa':false, 'Qi':false, 'Sex':false, 'Sa':false})
    const [experiencia, setExperiecia] =  useState(null);
    const [focoMusculo, setFocoMusculo] = useState(null)
    const [cardio,setCardio] = useState(null)
    const {getToken} = useContext(AuthContext);

    
    const router = useRouter();

    const renderExperiencia = () => (
        <View >
            <Text style={styles.text}>Qual sua experiencia de Treinamento?</Text>
            <RadioButton.Group  onValueChange={newValue => setExperiecia(newValue)} value={experiencia}>
                <RadioButton.Item  labelStyle={styles.text}  label="Iniciante" value="Iniciante" />
                <RadioButton.Item  labelStyle={styles.text} label="Intermediário" value="Intermediário" />
                <RadioButton.Item  labelStyle={styles.text} label="Avançado" value="Avançado" />
            </RadioButton.Group>
        </View>
    )


    const renderObjetivo = () => (
        <View style={styles.container}>
            <Text style={styles.text}>Qual seu Objetivo com treinamentos?</Text>
            <RadioButton.Group onValueChange={newValue => setObjetivo(newValue)} value={objetivo}>
                <RadioButton.Item  labelStyle={styles.text} label="Emagrecimento" value="Emagrecimento" />
                <RadioButton.Item  labelStyle={styles.text} label="Ganho de Massa" value="Ganho de Massa" />
                <RadioButton.Item  labelStyle={styles.text} label="Ganho de Força" value="Ganho de Força" />
                <RadioButton.Item  labelStyle={styles.text} label="Equilibrado" value="Equilibrado" />
            </RadioButton.Group>
        </View>
    )

    const renderDias = () => (
        <View style={styles.container}>
            <Text style={styles.text}>Quantos dias dias deseja dividir seus treinos?</Text>
            <Days days={days} setDays={setDays}></Days>
        </View>
    )

    const renderFoco = () => (
        <View style={styles.container}>
            <Text style={styles.text}>Qual foco Muscular nos seus treinos?</Text>
            <RadioButton.Group onValueChange={newValue => setFocoMusculo(newValue)} value={focoMusculo}>
                <RadioButton.Item labelStyle={styles.text} label="Superiores" value="Superiores" />
                <RadioButton.Item labelStyle={styles.text} label="Inferiores" value="Inferiores" />
                <RadioButton.Item labelStyle={styles.text} label="Corpo Inteiro" value="Corpo Inteiro" />
            </RadioButton.Group>

        </View>
    )

    const renderCardio = () => (
        <View style={styles.container}>
            <Text style={styles.text}>Incluir exercícios de cardio?</Text>
            <RadioButton.Group onValueChange={newValue => setCardio(newValue)} value={cardio}>
                <RadioButton.Item labelStyle={styles.text} label="Sim" value="Sim" />
                <RadioButton.Item labelStyle={styles.text} label="Não" value="Não" />
               
            </RadioButton.Group>

        </View>
    )

    const finishQuest = async () => {
        const token = await getToken()
        let data = { experiencia:experiencia, objetivo:objetivo,days:days,foco:focoMusculo, cardio:cardio }
        let response = await api.post('/new_rotina', data,
            {
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json',
                }
            });

        router.push("/")
    }

    return (
        <ScrollView style = {styles.page}>
            {renderExperiencia()}
            {renderObjetivo()}
            {renderDias()}
            {renderFoco()}
            {renderCardio()}
            <View>
            <TouchableOpacity style={styles.button} onPress={finishQuest}><Text style={styles.text} >Confirmar</Text></TouchableOpacity>
            </View>
        </ScrollView>
    );
}


const styles = StyleSheet.create({
   
    text:{
      fontSize:15,
      color: 'white',
    },
    page: {
        flex:1,
      padding: 30,
      paddingBottom:0,
     
      backgroundColor: 'black',
      
    },
    button: {
      
        alignItems:'center',
      backgroundColor: '#007BFF',
      paddingVertical: 12,
      paddingHorizontal: 20,
      borderRadius: 5,
      marginBottom:50
   
    },
    container:{
        marginTop:40
    }

  
 
  });

export default Questionario

