import {StyleSheet} from 'react-native';
import {height, width} from '../../shared/global-styles';

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  text_wrapper: {
    flex: 0.5,
    justifyContent: 'center',
  },
  small_text: {
    color: '#2766a1',
  },
  login_text: {
    color: '#2766a1',
    fontSize: 40,
    fontWeight: 'bold',
    alignSelf: 'center',
    alignContent: 'center',
    marginVertical: 20,
  },
  wrapper: {
    flex: 0.5,
    alignItems: 'center',
    backgroundColor: '#2766a1',
    borderTopRightRadius: 30,
    borderTopLeftRadius: 30,
    paddingTop: 20,
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
  small_btn: {
    marginVertical: 10,
  },
  small_btn_text: {
    color: 'white',
  },
  sign_btn: {
    paddingVertical: 10,
    borderRadius: 20,
    backgroundColor: '#d17c47',
    width: (width / 5) * 4,
    justifyContent: 'center',
    alignItems: 'center',
  },
  sign_text: {
    fontSize: 20,
  },
  big_text: {},
  list_wrapper: {
    margin: 10,
    backgroundColor: '#dedede',
    padding: 10,
    borderRadius: 20,
  },
  text: {
    color: '#333',
  },
});

export default styles;
