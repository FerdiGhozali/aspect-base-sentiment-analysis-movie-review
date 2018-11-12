const movieReducer = (state, action) => {
  switch(action.type) {
    case 'ADD_SENTIMENT':
      let newSentiment = {
        movieTitle : action.movieTitle,
        textReview : action.textReview,
        act : action.data.act_sentiment,
        plot : action.data.plot_sentiment
      }
      return {...state, movies : [newSentiment, ...state.movies]}
    default:
      return state
  }
}


export default movieReducer;