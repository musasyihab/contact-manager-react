import React from 'react';
import { StyleSheet, View, Text } from 'react-native';

const ErrorToast = ({ children }) => {
  const { errorContainer, errorText, errorClose } = styles;

  return (
    <View style={styles.errorContainer}>
      <Text style={styles.errorText}>{children}</Text>
      <Text style={styles.errorClose}>X</Text>
    </View>
  );
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
