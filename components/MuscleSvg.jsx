
import Svg, { Path } from 'react-native-svg';
import svg_muscles from '../svg_muscles';
import { AuthContext } from '../components/Contexto';
import React, { useContext, useEffect, useState } from 'react';
import {Text, ScrollView, StyleSheet, TouchableOpacity, View} from 'react-native';
import api from '../axios';



const MusclesSvg = () => {
    const {getToken} = useContext(AuthContext);
    const [musculo_color, setMuscleColor] = useState(null);
    const [musculo_porcentagem, setMusclePorcentagem] = useState(null)
    const [musculo_volume, setMuscleVolume] = useState(null)
    const [infobox, setInfoBox] = useState(null)

    const getStats = async() =>{
        const token = await getToken()
        const response = await api.get('/stats', {headers: {
            'Authorization': `Bearer ${token}`,  
            'Content-Type': 'application/json',
          }
        });
            setMuscleColor(response.data.musculo_color)
            setMuscleVolume(response.data.musculo)
            setMusclePorcentagem(response.data.musculo_porcentagem)
       };
    
    useEffect(() => {
        getStats();
    }, []);

    const handleMusclePress = (muscle) => {
       setInfoBox(muscle)
    }

    const renderBody = () => (
        <Svg width="900" height="900" viewBox="0 0 500 500">
            {/* Corpo completo */}
            <Path d={svg_muscles.fullbody} fill={"#FFFFFF"} />

            {/* Braços */}
            <Path d={svg_muscles.biceps_esquerdo} fill={musculo_color.Bíceps} onPress={() => handleMusclePress("Bíceps")} />
            <Path d={svg_muscles.biceps_direito} fill={musculo_color.Bíceps} onPress={() => handleMusclePress("Bíceps")} />

            {/* Quadríceps */}
            <Path d={svg_muscles.quadri_esquerdo} fill={musculo_color.Quadríceps} onPress={() => handleMusclePress("Quadríceps")} />
            <Path d={svg_muscles.quadri_direito} fill={musculo_color.Quadríceps} onPress={() => handleMusclePress("Quadríceps")} />

            {/* Abdômen */}
            <Path d={svg_muscles.abs_esquerdo} fill={musculo_color.Abdômen} onPress={() => handleMusclePress("Abdômen")} />
            <Path d={svg_muscles.abs_direito} fill={musculo_color.Abdômen} onPress={() => handleMusclePress("Abdômen")} />
            <Path d={svg_muscles.abs_lower_e} fill={musculo_color.Abdômen} onPress={() => handleMusclePress("Abdômen")} />
            <Path d={svg_muscles.abs_lower_d} fill={musculo_color.Abdômen} onPress={() => handleMusclePress("Abdômen")} />

            {/* Costas */}
            <Path d={svg_muscles.costas} fill={musculo_color.Costas} onPress={() => handleMusclePress("Costas")} />

            {/* Ombros */}
            <Path d={svg_muscles.ombro_e} fill={musculo_color.Deltóide} onPress={() => handleMusclePress("Deltóide")} />
            <Path d={svg_muscles.ombro_d} fill={musculo_color.Deltóide} onPress={() => handleMusclePress("Deltóide")} />
            <Path d={svg_muscles.ombro_back_e} fill={musculo_color.Deltóide} onPress={() => handleMusclePress("Deltóide")} />
            <Path d={svg_muscles.ombro_back_d} fill={musculo_color.Deltóide} onPress={() => handleMusclePress("Deltóide")} />

            {/* Tríceps */}
            <Path d={svg_muscles.triceps_e} fill={musculo_color.Tríceps} onPress={() => handleMusclePress("Tríceps")} />
            <Path d={svg_muscles.triceps_d} fill={musculo_color.Tríceps} onPress={() => handleMusclePress("Tríceps")} />

            {/* Panturrilhas */}
            <Path d={svg_muscles.pantu_e} fill={musculo_color.Panturrilha} onPress={() => handleMusclePress("Panturrilha")} />
            <Path d={svg_muscles.pantu_e2} fill={musculo_color.Panturrilha} onPress={() => handleMusclePress("Panturrilha")} />
            <Path d={svg_muscles.pantu_d} fill={musculo_color.Panturrilha} onPress={() => handleMusclePress("Panturrilha")} />
            <Path d={svg_muscles.pantu_d2} fill={musculo_color.Panturrilha} onPress={() => handleMusclePress("Panturrilha")} />
            <Path d={svg_muscles.pantu_back_e} fill={musculo_color.Panturrilha} onPress={() => handleMusclePress("Panturrilha")} />
            <Path d={svg_muscles.pantu_back_d} fill={musculo_color.Panturrilha} onPress={() => handleMusclePress("Panturrilha")} />

            {/* Posterior de coxa e glúteos */}
            <Path d={svg_muscles.posterior} fill={musculo_color.Posterior} onPress={() => handleMusclePress("Posterior")} />
            <Path d={svg_muscles.gluteos} fill={musculo_color.Glúteos} onPress={() => handleMusclePress("Glúteos")} />

            {/* Trapézio */}
            <Path d={svg_muscles.trapezio} fill={musculo_color.Trapézio} onPress={() => handleMusclePress("Trapézio")} />
            <Path d={svg_muscles.trapezio_e} fill={musculo_color.Trapézio} onPress={() => handleMusclePress("Trapézio")} />
            <Path d={svg_muscles.trapezio_d} fill={musculo_color.Trapézio} onPress={() => handleMusclePress("Trapézio")} />

            {/* Peitorais */}
            <Path d={svg_muscles.peito_e} fill={musculo_color.Peitoral} onPress={() => handleMusclePress("Peitoral")} />
            <Path d={svg_muscles.peito_d} fill={musculo_color.Peitoral} onPress={() => handleMusclePress("Peitoral")} />
        </Svg>
    )

    const renderInfoBox = () =>(
        <View style={styles.infobox}>
            <View style={styles.container}>
            <Text style={styles.text}>{infobox}:</Text>
            <Text style={styles.text2}>{musculo_porcentagem[infobox]}% dos Treinos</Text>
            </View>
            <View style={styles.container}>
            <Text style={styles.text2}>Volume Total:</Text>
            <Text style={styles.text2}>{musculo_volume[infobox]}</Text>
            </View>
        </View>
    )
    return (
        <ScrollView style = {styles.page}>
            {musculo_color && renderBody()}
            {infobox && renderInfoBox()}
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    //
    page: {
      paddingTop:50,
      backgroundColor: 'black',
    },
    text: {
        fontSize:23,
       color: 'white',
       marginLeft:10,
      },
      text2: {
        marginTop:2,
        fontSize:21,
       color: 'white',
       marginLeft:10,
      },
    infobox:{
        position:'absolute',
        padding: 10,
        borderRadius: 5,
        top: 550, // Ajuste conforme necessário
        left: 3, // Ajuste conforme necessário
        zIndex: 1, // Certifique-se de que a infobox esteja acima de outros elementos
    },

    container:{
        marginTop:10,
        flexDirection:'row'
    }

  });

export default MusclesSvg;