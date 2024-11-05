import { View, Text, TouchableOpacity, Modal, StyleSheet } from 'react-native';
import React from 'react';
import { VictoryChart, VictoryLine, VictoryScatter, VictoryAxis,VictoryLabel } from 'victory-native';

function ModalEx({ modal, setModal, deletar , graphData}) {
  const data = graphData


  const renderGraph = () => (
    <View>
        <VictoryChart >
          <VictoryAxis
            style={{
              axis: { stroke: "#fff" }, // Cor da linha do eixo X
              tickLabels: { fill: "#fff" }, // Cor dos rótulos do eixo X
              ticks: { stroke: "#fff", size: 5 }, // Cor e tamanho dos ticks (marcadores)
            }}
            tickValues={data.map(point => point.x)}
            tickFormat={data.map(point => point.x)}
          />
          <VictoryLine
            data={data}
            style={{
              data: { stroke: "#c43a31" },
              parent: { border: "1px solid #ccc" },
            }}
          />
          <VictoryScatter
            data={data}
            style={{

              data: { fill: "#c43a31" },
            }}
            size={4}
            labels={({ datum }) => datum.y.toString() + "kg"} // Exibe o valor y como rótulo sobre o ponto
            labelComponent={<VictoryLabel dy={-10} style={{ fontSize: 10, fill: "#fff" }} />} // Ajusta a posição e estilo do rótulo
          />
        </VictoryChart>
      </View>
  )

  return (
    <Modal transparent={true}>
      <View style={styles.modalContainer}>
        <TouchableOpacity onPress={() => { setModal(null) }}>
          <Text style={styles.text_x}>X</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button_x} onPress={() => { deletar(modal) }}>
          <Text style={styles.remover_ex}>X  Remover</Text>
        </TouchableOpacity>
        {data && renderGraph()}
      </View>
      
      
    </Modal>
  );
}

const styles = StyleSheet.create({
  button_x: {
    marginTop: 20,
    backgroundColor: '#2b2d30',
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 5,
  },
  modalContainer: {
    flex:1,
    flexDirection: 'column',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.8)',
  },
  remover_ex: {
    fontSize: 20,
    color: 'red',
    marginBottom: 10,
  },
  text_x: {
    marginTop: 50,
  
    paddingBottom: 18,
    paddingTop: 9,
    paddingHorizontal: 20,
    borderRadius: 30,
    marginLeft: 250,
    fontSize: 20,
    color: 'red',
    marginBottom: 10,
  },


});

export default ModalEx;
