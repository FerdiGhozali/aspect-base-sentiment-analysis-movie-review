import React, { Component } from 'react';
import InputMovieReview from './InputMovieReview';
import ListMovieReviews from './ListMovieReviews';

class App extends Component {
  render() {
    return (
      <div>
        <div style={{textAlign: "center", marginTop: '20px'}}>
          <h1 className="display-5">Movie Review App</h1>
        </div>
        <div className="container">
          <InputMovieReview/>
        </div>
        <div className="container">
          <ListMovieReviews/>
        </div>
      </div>
    );
  }
}

export default App;
