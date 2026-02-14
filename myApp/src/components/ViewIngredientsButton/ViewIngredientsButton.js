import React from 'react';
import { TouchableHighlight, Text, View } from 'react-native';
import styles from './styles';

const ViewIngredientsButton = ({ onPress }) => {
  return (
    <TouchableHighlight
      underlayColor="rgba(73,182,77,0.9)"
      onPress={onPress}
    >
      <View style={styles.container}>
        <Text style={styles.text}>View Ingredients</Text>
      </View>
    </TouchableHighlight>
  );
};

export default ViewIngredientsButton;
