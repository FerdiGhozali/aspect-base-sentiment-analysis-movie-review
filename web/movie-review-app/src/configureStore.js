import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { API_URL } from './Config';
import movieReducer from './Reducer';

const url_api = `${API_URL}`;

const state = {
  movies: [],
}

export default function configureStore(initialState = state){
  const store = createStore(movieReducer, initialState, applyMiddleware(thunk.withExtraArgument(url_api)));
  return store;
}