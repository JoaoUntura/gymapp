import { useContext, useEffect, useState } from "react";
import { View ,Text, ScrollView, TouchableOpacity,StyleSheet} from "react-native";
import axios from 'axios';
import { AuthContext } from "../components/Contexto";
import ModalEx from "../components/ModalEx";
import api from "../axios";

function Treinamentos (){
    const [treinamento, setTreinamento] = useState([]);
    const [idTreino, setIdTreino] = useState(null);
    const [series, setSeries] = useState(null);
    const [modal, setModal] = useState(null);


    const {getToken} = useContext(AuthContext);


    const getTreinamentos = async() =>{
        const token = await getToken()
        const response = await api.get('/treinamentos', {headers: {
            'Authorization': `Bearer ${token}`,  
            'Content-Type': 'application/json',
          }
        });
        setTreinamento(response.data)
       };

    const getSeries = async(id) =>{
        if (id !== null) {
        const response = await api.get(`/series/${id}`)
        setSeries(response.data)
        }
    }

    useEffect(() => {
        getTreinamentos();  
        
    },[]);

    useEffect(() => {
        if (idTreino) {
            getSeries(idTreino);
        }
    },[idTreino]);

   const delTreinamento = async(id) =>{
        const response = await api.delete(`/deltreinamento/${id}`)
        console.log(response.data)
        setModal(null)
        getTreinamentos();
   }
    
    const treinos = treinamento.map(t => <TouchableOpacity key={t} style={styles.button} onPress={()=> setIdTreino(t)} onLongPress={()=>setModal(t)}><Text>{t}</Text></TouchableOpacity>)



    return(
        <ScrollView style={styles.page}>
            
            {modal && <ModalEx modal={modal} setModal={setModal} deletar={delTreinamento} ></ModalEx>}
           {!series && treinos}
           {series && Object.keys(series).map(exercicio => 
            <View key={exercicio} style={styles.ex_container}>
                <Text style={styles.text} >{exercicio}</Text>
                {series[exercicio].map((serie,index) =>
                    <View key={index} style={styles.serie_container}>
                        <Text style={styles.num_serie_text}>{serie.numSerie}</Text>
                        <Text style={styles.serie_text}>Reps: {serie.reps}</Text>
                        <Text style={styles.serie_text}>Kg : {serie.kg}</Text>
                    </View>
                )}
                
            </View>
           ) }
           {series && <TouchableOpacity style={styles.button} onPress={()=> {setSeries(null); setIdTreino(null)}}><Text>Voltar</Text></TouchableOpacity>}
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
        alignItems:'center',
      backgroundColor: '#007BFF',
      paddingVertical: 12,
      paddingHorizontal: 20,
      borderRadius: 5,
      marginTop: 20,
      
    },

    text: {
        fontSize:20,
        marginLeft:10,
        color:'white'
    },

    serie_text: {
        fontSize:20,
        marginLeft:50,
        color:'white'
    },

    num_serie_text: {
        fontSize:20,
        marginLeft:20,
        color:'white'
    },
    serie_container:{
        padding:10,
        alignContent:'center',
        alignItems:'flex-start',
        marginTop:30,
        justifyContent:'flex-start',
        flexDirection:'row',
        backgroundColor:'grey',
        width:400 
    },

    ex_container:{
        flexDirection:'column',
        alignContent:'center',
        alignItems:'center',
        justifyContent:'center',
        marginTop:20,
        borderTopWidth:2,
        borderColor: 'lightgrey'
    }

  });

export default Treinamentos