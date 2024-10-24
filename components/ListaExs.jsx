import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, ScrollView, StyleSheet, TouchableOpacity, Image } from 'react-native';
import {Picker} from '@react-native-picker/picker'
import axios from 'axios';
import api from '../axios';


function ListaExs({ setEx, setListaExs, exAtivo }) {
  const [exercicios, setExercicios] = useState([]);
  const [pesquisa, setPesquisa] = useState('');
  const [categoria, setCategoria] = useState('todos');

  useEffect(() => {
    const getExercicios = async () => {
      const response = await api.get('/exercicios');
      setExercicios(response.data);
    };
    getExercicios();
  }, []);

  let exFiltrados = categoria !== 'todos' ? exercicios.filter(exercicio => exercicio.nome_muscle == categoria) : exercicios;
  exFiltrados = pesquisa.length > 0 ? exFiltrados.filter(exercicio => exercicio.nome.toLowerCase().includes(pesquisa.toLowerCase())) : exFiltrados;

  const sendEx = (exercicio) => {
    let existe = exAtivo.filter(e => e.idExercicio == exercicio.idExercicio);
    if (existe.length === 0) {
      setEx(prevItems => [...prevItems, { idExercicio: exercicio.idExercicio, nome: exercicio.nome }]);
      
      setListaExs(false);
    } else {
      alert('Esse exercício já foi adicionado!');
    }
  };

  const categorias = [...new Set(exercicios.map(exercicio => exercicio.nome_muscle))];
  
  const listaExs = exFiltrados.map(exercicio => (
    <View style={styles.card} key={exercicio.idExercicio}>
      <Image source={require('../assets/images/black.jpg')}  style={styles.img}/>
      <View style={styles.nomes}>
      <Text style={styles.text}>{exercicio.nome}</Text>
      <Text style={styles.text} >{exercicio.nome_muscle}</Text>
      <TouchableOpacity style={styles.button_add_ex} onPress={() => sendEx(exercicio)}><Text style={styles.text_add_ex}>Adicionar exercício</Text></TouchableOpacity> 
      </View>
      
    </View>
  ))


  return (
    <ScrollView style={styles.cardColuna}>
      <TextInput
        style={styles.input}
        placeholder="Pesquisar exercício..."
        onChangeText={text => setPesquisa(text)}
      />
      <Picker style={styles.picker} selectedValue={categoria} onValueChange={(itemValue) => setCategoria(itemValue)}>
        <Picker.Item style={styles.picker_item} label="Todos" value="todos" />
        {categorias.map(muscle => <Picker.Item style={styles.picker_item} label={muscle} value={muscle} key={muscle} />)}
      </Picker>
      {listaExs}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  cardColuna: {
    padding: 0,
  },
  card: {
    flexDirection:'row',
    paddingTop:20,
    paddingBottom:20,
    borderTopWidth:2,
    borderColor: 'lightgrey',
  },
  input: {
    borderWidth: 1,
    padding: 10,
    marginBottom: 10,
    color:'white',
    backgroundColor:'grey',
    borderRadius:19
  },
  text:{
    fontSize:15,
    color: 'white',
  },

  img:{
      marginTop:14,
      borderRadius:60,
      width:130,
      height:130
  },

  nomes:{
   flexDirection:'column', 
   marginLeft:12,
   marginTop:15,
   alignContent:'center'
   
  },

  button_add_ex: {
    backgroundColor: '#007BFF',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 5,
    marginTop: 10,
    marginBottom:40,
    width:185
  },

  text_add_ex:{
    marginLeft:7,
    fontSize:14,
    color:"white"
  },

  picker:{
    color:'black',
    backgroundColor:'grey',
    marginBottom:20,
    padding:1
  },

  picker_item:{
    fontSize:15
  }
});






export default ListaExs;
