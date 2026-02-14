import React from 'react';
import { TouchableOpacity, Image } from 'react-native';
import PropTypes from 'prop-types';
import styles from './styles';

const BackButton = ({ onPress }) => {
  return (
    <TouchableOpacity onPress={onPress} style={styles.btnContainer}>
      <Image
        source={require('../../../assets/icons/backArrow.png')}
        style={styles.btnIcon}
      />
    </TouchableOpacity>
  );
};

BackButton.propTypes = {
  onPress: PropTypes.func,
};

export default BackButton;
