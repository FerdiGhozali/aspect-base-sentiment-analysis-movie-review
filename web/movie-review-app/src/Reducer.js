const initialState = {
  movies: [],
}

export const reducer = (state = initialState, action) => {
  switch(action.type) {
    case 'ADD_SENTIMENT':
      return state
    default:
      return state
  }
}