import * as React from 'react';
import { Text, View, StyleSheet } from 'react-native';
import Constants from 'expo-constants';

import { TextInput, Button } from 'react-native-paper';

export default class App extends React.Component {

  state = {
    peso: 0,
    altura: 0,
    imc: 0,
    legenda: 'Indeterminado',
    cor: '#C0C0C0'
  }


  calcImc = () => {

    const resultado = (this.state.peso > 0 && this.state.altura > 0) ?
      this.state.peso / (this.state.altura * this.state.altura) :
      0
    const corGrid = resultado > 0 ? resultado < 18.5 ? '#363636' :
      resultado <= 25 ? '#87CEFA' :
        resultado <= 30 ? '#ADFF2F' :
          resultado <= 40 ? '#FF6347' :
            '#8B0000' : '#C0C0C0'

    const resultadolegenda = resultado > 0 ? resultado < 18.5 ? 'Magreza' :
      resultado <= 25 ? 'Normal' :
        resultado <= 30 ? 'Sobrepezo' :
          resultado <= 40 ? 'Obesidade' :
            'Obesidade Grave' : 'Indeterminado'

    this.setState({ imc: Math.ceil(resultado), legenda: resultadolegenda, cor: corGrid })

  }

  handlePeso(e) {
    alert(e)
    this.setState({ ...this.state, peso: e })
  }

  render() {

    return (
      <View style={styles.app}>
        <Text style={styles.legenda}>Seu IMC</Text>
        <View style={[styles.painel, { backgroundColor: this.state.cor }]}>
          <Text style={styles.resultado}>{this.state.imc}</Text>
          <Text style={styles.diagnostico}>{this.state.legenda}</Text>
        </View>
        <View >
          <TextInput label='Peso' style={styles.peso} onChangeText={valor => this.setState({ peso: valor.replace(',', '.') })} />
          <TextInput label='Altura' style={styles.altura} onChangeText={valor => this.setState({ altura: valor.replace(',', '.') })} />
          <Button mode="contained" style={{ marginVertical: 30 }} onPress={this.calcImc}>Calcular</Button>
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  app: {
    padding: 30
  },
  painel: {
    // backgroundColor: '#C0C0C0',
    borderRadius: 5,
    paddingVertical: 10,
    marginVertical: 30,
    borderColor: 1
  },
  legenda: {
    textAlign: 'center',
    fontWeight: 'bold'
  },
  resultado: {
    textAlign: 'center',
    fontSize: 22,
    fontWeight: 'bold'
  },
  diagnostico: {
    textAlign: 'center',
    fontSize: 16,
    fontWeight: 'bold'
  },
  peso: {
    marginVertical: 30,
  },
  altura: {
    marginVertical: 30,
  }
});
