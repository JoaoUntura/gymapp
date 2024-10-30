import Days from "../components/Days";
import React, { useContext, useEffect, useState } from 'react';
import Exercicios from "../components/Exercicios"; 
import { AuthContext } from "../components/Contexto";
import api from "../axios";
import {Text, ScrollView, StyleSheet, TouchableOpacity} from 'react-native';
import { useRouter } from 'expo-router';
import NovoTreinamento from "../components/NovoTreinamento";


function MyCalendar () {
    const [days, setDays] = useState({'Do':false, 'Se':false, 'Te':false, 'Qa':false, 'Qi':false, 'Sex':false, 'Sa':false})
    const [selectedDay, setSelectedDay] = useState(null)
    const [rotina, setRotina] = useState(null);
    const {getToken} = useContext(AuthContext);




    const getRotina = async() =>{
        const token = await getToken()
        const response = await api.get('/get_rotina', {headers: {
            'Authorization': `Bearer ${token}`,  
            'Content-Type': 'application/json',
          }
        });
        
      setRotina(response.data.myrotina)

       };

    useEffect(() => {
        if(!rotina){
          getRotina();
          
        }
        
        console.log(rotina)
      }, []);
    
    useEffect(() => {
      if (rotina) {
        Object.keys(rotina).map((dia => {
          if (dia in days) {
            setDays(prev => ({ ...prev, [dia]: true }))

          }

        }))
      }
    }, [rotina]);
    
    return(
        <ScrollView style={styles.page}>
          {!selectedDay && <Days setSelectedDay={setSelectedDay} days={days} setDays={setDays}></Days>}
          <NovoTreinamento rotina={rotina} selectedDay={selectedDay}></NovoTreinamento>
        </ScrollView>
        
    );
}
const styles = StyleSheet.create({
  //
  page: {
    padding: 20,
    paddingTop:40,
    backgroundColor: 'black',
  }, text_add_serie: {
    fontSize: 17,
    marginRight: 8,
    color: 'white'
  },
  button: {
    backgroundColor: '#007BFF',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 5,
    marginTop: 10,
    marginBottom:40
  }
});



export default  MyCalendar