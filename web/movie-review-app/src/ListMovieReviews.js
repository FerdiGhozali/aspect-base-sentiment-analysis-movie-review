import React, { Component } from 'react';
import { dummyData } from './DummyData';
import CardMovieReview from './CardMovieReview';

class ListMovieReviews extends Component {
  render() {
    const row = dummyData;
    const rows = row.map((movie) => <CardMovieReview movie={movie}/>)
    return (
      <div className="list-group" style={{overflowX:'auto', height:'50vh'}}>
        {rows}
      </div>
    );
  }
}

export default ListMovieReviews;