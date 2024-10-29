import Days from "../components/Days";
import React, { useContext, useEffect, useState } from 'react';
import Exercicios from "../components/Exercicios"; 
import { AuthContext } from "../components/Contexto";
import api from "../axios";
import {Text, ScrollView, StyleSheet, TouchableOpacity} from 'react-native';
import { useRouter } from 'expo-router';


function MyCalendar () {
    const [days, setDays] = useState({'Do':false, 'Se':false, 'Te':false, 'Qa':false, 'Qi':false, 'Sex':false, 'Sa':false})
    const [selectedDay, setSelectedDay] = useState("")
    const [exAtivo, setEx] = useState([]);
    const [serie, setSerie] = useState([]);
    const [rotina, setRotina] = useState(null);
    const {getToken} = useContext(AuthContext);

    const router = useRouter();
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
        getRotina();
        
      }, []);
    
    useEffect(() => {
      if (rotina && selectedDay && rotina[selectedDay]) {  
        setEx(rotina[selectedDay]["exAtivo"] || []);
        setSerie(rotina[selectedDay]["serie"] || []);
        console.log("oi")
    }
    }, [selectedDay]);
  
    const finishWork = async() => {
      const token = await getToken()
      const volume =100
      let data = {serie:serie, volume:volume}
      let response = await api.post('/novo_treinamento', data ,
        {headers: {
            'Authorization': `Bearer ${token}`,  
            'Content-Type': 'application/json',
          }
        });
      
      router.push("/Treinamentos ")
    }
  
      
    return(
        <ScrollView style={styles.page}>
          <Exercicios exAtivo={exAtivo} setEx={setEx} serie={serie} setSerie={setSerie}></Exercicios>
          <TouchableOpacity style={styles.button}  onPress={finishWork}><Text style={styles.text_add_serie}>Finalizar</Text></TouchableOpacity>
          <Days setSelectedDay={setSelectedDay} days={days} setDays={setDays}></Days>
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