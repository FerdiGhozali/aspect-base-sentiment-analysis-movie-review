export const addTextReview = (movieTitle, textReview) => {
  return (dispatch, getState, url_api) => {
    return fetch(`${url_api}/predict`, {
        method: 'POST',
        headers: {
          'Content-Type': 'text/plain'
        },
        body: textReview
      })
      .then(response => {
        dispatch(response.data);
      })
      .catch(error => {
        console.log(error);
      });
  };
} 

export function addSentiment(movieTitle, textReview, data) {
  return {
    type: 'ADD_SENTIMENT',
    data
  };
}