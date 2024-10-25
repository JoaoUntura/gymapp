import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';


const Days = () => {
  const [days, setDays] = useState({'Do':false, 'Se':false, 'Te':false, 'Qa':false, 'Qi':false, 'Sex':false, 'Sa':false})

  const handleDayChange = (day) => {
    let valor;
    if (days[day]){
      valor = false
    }else{
      valor = true
    }

    setDays(d=> ({...d, [day]:valor}))
  }

  const renderDays = () => (
    Object.keys(days).map((day,index) =>
      <TouchableOpacity key={index} style = {days[day] ? styles.day_check : styles.day_uncheck} onPress={() => handleDayChange(day)}>
        <Text style={styles.day_text}>{day}</Text>
        </TouchableOpacity>
    )
  )

  return (
    <View style={styles.page}> 
    <View style={styles.container}>
      {renderDays()}
    </View>
    </View>
  );
};

const styles = StyleSheet.create({
  page: {
    flex:1,
  padding: 10,
  paddingTop:60,
  backgroundColor: 'black',
  alignItems:'center'
},
  container: {
    width:350,
    justifyContent:'space-around',
    flexDirection:'row'
  },
  day_uncheck: {
    borderRadius:20,
    backgroundColor :'black'
  },
  day_check: {

    borderRadius:20,
    backgroundColor :'red'
  },
  day_text:{
    fontSize:16,
    color:'white'
  }

});

export default Days;