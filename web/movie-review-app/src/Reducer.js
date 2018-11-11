const movieReducer = (state, action) => {
  switch(action.type) {
    case 'ADD_SENTIMENT':
      let newSentiment = {
        movieTitle : action.movieTitle,
        textReview : action.textReview,
        act : action.data,
        plot : action.data
      }
      return {...state, movies : [...state.movies, newSentiment]}
    default:
      return state
  }
}


export default movieReducer;