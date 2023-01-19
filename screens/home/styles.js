import {StyleSheet} from 'react-native';
import {width} from '../../shared/global-styles';

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map_style: {
    width: width,
    flex: 0.5,
  },
  inputs_section: {
    flex: 0.5,
    alignItems: 'center',
  },
  small_text: {
    color: '#333',
    marginVertical: 30,
    fontSize: 20,
  },
  input: {
    backgroundColor: '#dedede',
    borderRadius: 20,
    width: (width / 5) * 4,
    paddingHorizontal: 20,
    paddingVertical: 7,
    color: '#333',
    marginVertical: 10,
  },
  camera_btn: {
    flex: 1,
    backgroundColor: '#2766a1',
    paddingVertical: 10,
    // backgroundColor: '#d17c47',
    marginTop: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  camera_btn_text: {
    color: '#333',
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default styles;
