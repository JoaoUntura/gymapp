

import { View, Text, TextInput, Button, ScrollView, StyleSheet, TouchableOpacity, Modal} from 'react-native';
import { RadioButton } from 'react-native-paper';
import Slider from '@react-native-community/slider';
import React, { useContext, useEffect, useState } from 'react';

function Questionario (){
    const [objetivo, setObjetivo] = useState(null);
    const [dias, setDias] = useState(1);
    const [experiencia, setExperiecia] =  useState(null);
    const [focoMusculo, setFocoMusculo] = useState(null)
    const [cardio,setCardio] = useState(null)

    const renderExperiencia = () => (
        <View>
            <Text style={styles.text}>Qual seu nível de Treinamento?</Text>
            <RadioButton.Group  onValueChange={newValue => setExperiecia(newValue)} value={experiencia}>
                <RadioButton.Item  labelStyle={styles.text}  label="Iniciante" value="first" />
                <RadioButton.Item  labelStyle={styles.text} label="Intermediário" value="second" />
                <RadioButton.Item  labelStyle={styles.text} label="Avançado" value="third" />
            </RadioButton.Group>
        </View>
    )


    const renderObjetivo = () => (
        <View>
            <Text style={styles.text}>Qual seu Objetivo com treinamentos?</Text>
            <RadioButton.Group onValueChange={newValue => setObjetivo(newValue)} value={objetivo}>
                <RadioButton.Item  labelStyle={styles.text} label="Emagrecimento" value="first" />
                <RadioButton.Item  labelStyle={styles.text} label="Ganho de Massa" value="second" />
                <RadioButton.Item  labelStyle={styles.text} label="Ganho de Força" value="second" />
                <RadioButton.Item  labelStyle={styles.text} label="Equilibrado" value="third" />
            </RadioButton.Group>
        </View>
    )

    const renderDias = () => (
        <View>
            <Text style={styles.text}>Quantos dias dias deseja dividir seus treinos?</Text>
            <Slider
            minimumValue={1}
            maximumValue={7}
            step={1}
            value={dias} 
            onValueChange={setDias} />
            <Text>Você selecionou: {dias} dias</Text>
        </View>
    )

    const renderFoco = () => (
        <View>
            <Text style={styles.text}>Qual foco Muscular nos seus treinos?</Text>
            <RadioButton.Group onValueChange={newValue => setFocoMusculo(newValue)} value={focoMusculo}>
                <RadioButton.Item labelStyle={styles.text} label="Superiores" value="first" />
                <RadioButton.Item labelStyle={styles.text} label="Inferiores" value="second" />
                <RadioButton.Item labelStyle={styles.text} label="Corpo Inteiro" value="third" />
            </RadioButton.Group>

        </View>
    )

    const renderCardio = () => (
        <View>
            <Text style={styles.text}>Incluir exercícios de cardio?</Text>
            <RadioButton.Group onValueChange={newValue => setCardio(newValue)} value={cardio}>
                <RadioButton.Item labelStyle={styles.text} label="Sim" value="first" />
                <RadioButton.Item labelStyle={styles.text} label="Não" value="second" />
               
            </RadioButton.Group>

        </View>
    )


    return (
        <ScrollView style = {styles.page}>
            {renderExperiencia()}
            {renderObjetivo()}
            {renderDias()}
            {renderFoco()}
            {renderCardio()}
            <View>
            <TouchableOpacity style={styles.button}><Text style={styles.text}>Confirmar</Text></TouchableOpacity>
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
   
    }

  
 
  });

export default Questionario

