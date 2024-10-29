import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, Button, ScrollView, StyleSheet, TouchableOpacity, Modal } from 'react-native';
import ModalEx from "./ModalEx";


function Exercicios({ exAtivo, setEx, serie, setSerie}) {

   
  const [modal, setModal] = useState(null)



  const handleChangeSerie = (idSerie, valor, campo) => {
    
      setSerie(prevSerie => prevSerie.map(s => s.idSerie == idSerie ? { ...s, [campo]: valor } : s));
  };

  const addSerie = (idExercicio) => {
      let seriesDesseID = serie.filter(s => s.idEx == idExercicio);

      let lastIdSerie;
      if (serie.length == 0){
        lastIdSerie = 0
      }else{
        lastIdSerie = serie[serie.length-1].idSerie
      }
        
      let proximaSerie = seriesDesseID.length == 0 ? 1 : seriesDesseID[seriesDesseID.length - 1].numSerie + 1;
  
      setSerie(prev => [...prev, { idSerie: lastIdSerie + 1, numSerie: proximaSerie, idEx: idExercicio, reps: '', kg: '' }]);
  };

  const deleteSerie = (serieDeletada) => {
      setSerie(serie.filter(s => s !== serieDeletada));

  };

  const deleteEx = (exercicio) => {
      setEx(exAtivo.filter(ex => ex.idExercicio !== exercicio));
      setSerie(serie.filter(s => s.idEx !== exercicio));
      setModal(null)
    };


    const createModal = (idExercicio) => {
      setModal(idExercicio)
    };

    
  const renderSeries = (idExercicio) =>{
      let seriesDesseID = serie.filter(s=> s.idEx == idExercicio)

      return seriesDesseID.map(s => 
        <View style={styles.serie} key={s.idSerie}>
          <Text style={styles.serie_number}> {s.numSerie}</Text>
          <TextInput
            style={styles.input}
            keyboardType="numeric"
            value={String(s.reps)}
            placeholderTextColor="white"
            placeholder="Reps"
            onChangeText={valor => handleChangeSerie(s.idSerie, valor, 'reps')}
          />
          <TextInput
            style={styles.input}
            keyboardType="numeric"
            value={String(s.kg)}
            placeholderTextColor="white"
            placeholder="Kg"
            onChangeText={valor => handleChangeSerie(s.idSerie, valor, 'kg')}
          />
          <Button title="X" onPress={() => deleteSerie(s)} />
        </View>
      );
  }

  const renderExsAtivos = () => (exAtivo.map(exercicio =>
      (<View style={styles.cardAtivos} key={exercicio.idExercicio}>
          <TouchableOpacity onLongPress={() => createModal(exercicio.idExercicio)} >
              <Text style={styles.nome_ex}>{exercicio.nome}</Text>
          </TouchableOpacity>
          {renderSeries(exercicio.idExercicio)}
          <TouchableOpacity style={styles.button_ex} onPress={() => addSerie(exercicio.idExercicio)}>
              <Text style={styles.text_add_serie}> + Adicionar Serie</Text>
          </TouchableOpacity>
      </View>)
  ))


  return (
      <>
      {modal && <ModalEx modal={modal} setModal={setModal}  deletar={deleteEx} />}
      {renderExsAtivos()}
      </>

  );

}
const styles = StyleSheet.create({

    button: {
      backgroundColor: '#007BFF',
      paddingVertical: 12,
      paddingHorizontal: 20,
      borderRadius: 5,
      marginTop: 10,
    },
  
    button_ex: {
      backgroundColor: '#2b2d30',
      paddingVertical: 12,
      paddingHorizontal: 20,
      borderRadius: 5,
      marginTop: 10,
    },
  
  
    cardAtivos: {
      flexDirection: 'column',
      borderTopWidth: 1,
      borderBottomWidth: 1,
      padding: 20,
      paddingTop: 10,
      borderColor: '#999e9b',
      alignItems: 'center',
  
    },
  
    //
    serie: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
  
    },

    //
    input: {
      fontSize: 18,
      color: 'white',
      borderWidth: 0,
      padding: 5,
      marginHorizontal: 5,
      width: 120,
  
    },
  
    button_x: {
      backgroundColor: '#2b2d30',
      paddingVertical: 15,
      paddingHorizontal: 30,
      borderRadius: 5,
    },
  
    nome_ex: {
      fontSize: 20,
      color: 'white',
      marginBottom: 10,
    },
    
    //
    serie_number: {
      fontSize: 17,
      marginRight: 8,
      color: 'white'
    },
  
    text_add_serie: {
      fontSize: 17,
      marginRight: 8,
      color: 'white'
    },
  
    container: {
      flex: 1,
      padding: 20,
      justifyContent: 'center',
    },

    remover_ex: {
      fontSize: 20,
      color: 'red',
      marginBottom: 10,
    },
  
  });

export default Exercicios