import React, { Component } from 'react';
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';

class ErrorToast extends Component {
  state = { visible: true };

  onDismissToast() {
    this.setState({visible: !this.state.visible});
  }

  render(){
    const { errorContainer, errorText, errorClose } = styles;

    if(this.state.visible){
      return (
        <View style={styles.errorContainer}>
          <Text style={styles.errorText}>{this.props.children}</Text>
          <TouchableOpacity onPress={this.onDismissToast.bind(this)}>
            <Text style={styles.errorClose}>X</Text>
          </TouchableOpacity>
        </View>
      )
    } else {
        return (
          <View></View>
        )
    }
  }
};

const styles = StyleSheet.create({
  errorContainer:{
    padding: 8,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#cc0c02'
  },
  errorText:{
    flex: 1,
    color: '#ffffff'
  },
  errorClose:{
    fontSize: 18,
    fontWeight: 'bold',
    color: '#ffffff'
  }
});

export { ErrorToast };
