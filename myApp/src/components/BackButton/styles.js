import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  btnContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 100,
    padding: 8,
    margin: 10,
    backgroundColor: '#FFFFFF',

    // Shadow for iOS
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.5,

    // Shadow for Android
    elevation: 4,
  },

  btnIcon: {
    width: 18,
    height: 18,
    resizeMode: 'contain',
  },
});
