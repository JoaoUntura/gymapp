import React, { useContext,useEffect, useState } from 'react';
import { View, Text, TextInput, Button, ScrollView, StyleSheet, TouchableOpacity, Modal} from 'react-native';
import Card from '../components/Card';
import Exercicios from '../components/Exercicios';
import { Link, useRouter } from 'expo-router';
import { AuthContext } from '../components/Contexto';

import axios from 'axios';



function NovoTreinamento() {
  const [showCard, setCard] = useState(false);
  const [exAtivo, setEx] = useState([]);
  const [serie, setSerie] = useState([]);
  const {getToken} = useContext(AuthContext);

  const router = useRouter();

  const renderCard = () => {
    setCard(true);
  };
  

  const finishWork = async() => {
    const token = await getToken()
    let response = await axios.post('http://192.168.3.3:8000/novo_treinamento', {serie:serie},
      {headers: {
          'Authorization': `Bearer ${token}`,  
          'Content-Type': 'application/json',
        }
      });
    
    router.push("/Treinamentos ")
  }

  return (
    <ScrollView style={styles.page}>
      {!showCard && <Exercicios exAtivo={exAtivo} setEx={setEx} serie={serie} setSerie={setSerie}/>}
      {!showCard && <TouchableOpacity style={styles.button} onPress={renderCard} >
        <Text style={styles.text_add_serie} >Adicionar Exercício</Text>
      </TouchableOpacity>}
      {showCard && <Card exAtivo={exAtivo} setEx={setEx} setCard={setCard} />}
      {!showCard && <TouchableOpacity style={styles.button}  onPress={finishWork}><Text style={styles.text_add_serie}>Finalizar</Text></TouchableOpacity>}
    </ScrollView>
  );
}


const styles = StyleSheet.create({
  //
  page: {
    padding: 20,
    backgroundColor: 'black',
  },
  //
  button: {
    backgroundColor: '#007BFF',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 5,
    marginTop: 10,
    marginBottom:40
  },

  //
  text_add_serie: {
    fontSize: 17,
    marginRight: 8,
    color: 'white'
  },
});

export default NovoTreinamento;
