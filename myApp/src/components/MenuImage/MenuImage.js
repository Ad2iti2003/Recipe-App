import React from 'react';
import { TouchableOpacity, Image } from 'react-native';
import styles from './styles';

const MenuImage = ({ onPress }) => {
  return (
    <TouchableOpacity
      style={styles.headerButtonContainer}
      onPress={onPress}
    >
      <Image
        style={styles.headerButtonImage}
        source={require('../../../assets/icons/menu.png')}
      />
    </TouchableOpacity>
  );
};

export default MenuImage;
