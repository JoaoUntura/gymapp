import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';


const Days = ({setSelectedDay, days, setDays}) => {
  

  const handleDayChange = (day) => {
    let valor;
    if (days[day]){
      valor = false
    }else{
      valor = true
    }

    setDays(d=> ({...d, [day]:valor}))
    console.log(day)
    setSelectedDay(day)

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
  backgroundColor: 'black',
  alignItems:'center'
},
  container: {
    width:330,
    justifyContent:'space-around',
    flexDirection:'row'
  },
  day_uncheck: {
    justifyContent:'center',
    width:35,
    height:35,
    borderRadius:20,
    backgroundColor :'black'
  },
  day_check: {
    justifyContent:'center',
    width:35,
    height:35,
    borderRadius:20,
    backgroundColor :'red'
  },
  day_text:{
    marginLeft:5,
    fontSize:16,
    color:'white'
  }

});

export default Days;