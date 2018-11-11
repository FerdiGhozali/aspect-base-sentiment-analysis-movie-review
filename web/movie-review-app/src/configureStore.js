import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { API_URL } from './Config';
import { reducer } from './Reducer';

const url_api = `${API_URL}`;

export default function configureStore(initialState = {}){
  const store = createStore(reducer, initialState, applyMiddleware(thunk.withExtraArgument(url_api)));
  return store;
}