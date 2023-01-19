import {StyleSheet} from 'react-native';
import {width} from '../../shared/global-styles';

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  preview: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  small_text: {
    color: '#333',
  },
  input: {
    backgroundColor: '#dedede',
    borderRadius: 20,
    width: (width / 5) * 4,
    paddingHorizontal: 20,
    paddingVertical: 10,
    color: '#333',
    marginVertical: 10,
  },
});

export default styles;
