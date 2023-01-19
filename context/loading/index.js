import {createContext} from 'react';

const Loading_context = createContext({
  loading: false,
  set_loading: loading => {},
});

export default Loading_context;
