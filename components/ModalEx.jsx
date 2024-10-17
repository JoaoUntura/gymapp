import { View, Text, TextInput, Button, ScrollView, StyleSheet, TouchableOpacity, Modal } from 'react-native';
import React, { useEffect, useState } from 'react';


function ModalEx({exSelecionado,deleteEx,setExselecionado}) {
  console.log('Modal aberto', exSelecionado);

    return (
        <Modal transparent={true}>
            <View style={styles.modalContainer}>
            <TouchableOpacity onPress={() => {setExselecionado("")}}>
                    <Text style={styles.text_x}>X</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.button_x} onPress={() => {deleteEx(exSelecionado) }}>
                    <Text style={styles.remover_ex}>X   Remover Exercício</Text>
                </TouchableOpacity>
            </View>
        </Modal>
    );
}

const styles = StyleSheet.create({
    
    //
    button_x: {
      marginTop:70,
      backgroundColor: '#2b2d30',
      paddingVertical: 15,
      paddingHorizontal: 30,
      borderRadius: 5,
    },
  
    //
    modalContainer: {
      flex:1,
      flexDirection:'column',
      alignItems: 'center',
      backgroundColor: 'rgba(0, 0, 0, 0.8)', 
    },
    
    //
    remover_ex: {
      fontSize: 20,
      color: 'red',
      marginBottom: 10,
    },

    text_x:{
      marginTop:200,
      backgroundColor: '#2b2d30',
      paddingBottom:18,
      paddingTop:9,
      paddingHorizontal: 20,
      borderRadius: 30,
      marginLeft:250,
      fontSize: 20,
      color: 'red',
      marginBottom: 10,
    }
  
  });


export default ModalEx