export const addTextReview = (movieTitle, textReview) => async (dispatch, getState, url_api) => {
  try {
    const url = `${url_api}/`;
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'text/plain'
      },
      body: textReview
    });
    const responseBody = await response.json();
    dispatch(addSentiment(movieTitle, textReview, responseBody));
  } catch (error) {
    console.log(error);
  }
} 

export function addSentiment(movieTitle, textReview, data) {
  return {
    type: 'ADD_SENTIMENT',
    movieTitle,
    textReview,
    data,
  };
}