import React, { useContext, useEffect, useState } from 'react';
import {Text, ScrollView, StyleSheet, TouchableOpacity} from 'react-native';
import ListaExs from './ListaExs';
import Exercicios from './Exercicios';
import { useRouter } from 'expo-router';
import { AuthContext } from './Contexto';
import api from '../axios';



function NovoTreinamento() {
  const [showListaExs, setListaExs] = useState(false);
  const [exAtivo, setEx] = useState([]);
  const [volume, setVolume] = useState(0)
  const [serie, setSerie] = useState([]);
  const [bestSerie, setBestSerie] = useState(null)
  const [bestKg, setBestKg] = useState(null)


  const {getToken} = useContext(AuthContext);

  const router = useRouter();

  const renderLista = () => {
    setListaExs(true);
  };
  

  const finishWork = async() => {
    const token = await getToken()
    let data = {serie:serie, volume:volume}
    let response = await api.post('/novo_treinamento', data ,
      {headers: {
          'Authorization': `Bearer ${token}`,  
          'Content-Type': 'application/json',
        }
      });
    
    router.push("/Treinamentos ")
  }

  const getBestSeriesKg = async(exs) => {
    
    console.log(exs)
    const token = await getToken()
    let data = {"exs":exs}
    let response = await api.post('/get_best', data ,
      {headers: {
          'Authorization': `Bearer ${token}`,  
          'Content-Type': 'application/json',
        }
      });

    let bestSerieData = response.data.bestSeries
    setBestSerie(bestSerieData)
    let bestKgData = response.data.bestKgs
    setBestKg(bestKgData)
    
  }

  useEffect(() => {
    let calc = 0
    serie.forEach(s => (
      calc += parseInt(s.reps) * parseInt(s.kg)
    
    ))
    setVolume(calc)
  },[serie])
  
  useEffect(() => {
    
    if (exAtivo.length > 0){
    getBestSeriesKg(exAtivo)
    }
    

  },[exAtivo])
  

  const renderUserTreinoAtual = () => (
    <>
      <Text style={styles.text_add_serie}>Volume: {volume}</Text>
  
      <Exercicios exAtivo={exAtivo} setEx={setEx} serie={serie} setSerie={setSerie} bestSerie={bestSerie} bestKg={bestKg} />

      <TouchableOpacity style={styles.button} onPress={renderLista} ><Text style={styles.text_add_serie} >Adicionar Exercício</Text></TouchableOpacity>
      <TouchableOpacity style={styles.button} onPress={finishWork}><Text style={styles.text_add_serie}>Finalizar</Text></TouchableOpacity>
    </>
  )

  const renderListaExsBd = () => (
    <ListaExs exAtivo={exAtivo} setEx={setEx} setListaExs={setListaExs} />
  )

  
    
  return (
    <ScrollView style={styles.page}>
     
      {showListaExs ?renderListaExsBd() : renderUserTreinoAtual()}
      
    </ScrollView>
  );
}


const styles = StyleSheet.create({
  //
  page: {
    padding: 20,
    paddingTop:40,
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
