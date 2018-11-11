import React, { Component } from 'react';
import { connect } from 'react-redux';
import CardMovieReview from './CardMovieReview';

class ListMovieReviews extends Component {
  render() {
    const movieSentiments = this.props.movies;
    const rows = movieSentiments.map((movie, i) => <CardMovieReview movie={movie} key={i}/>)
    return (
      <div className="list-group" style={{overflowX:'auto', height:'50vh'}}>
        {rows}
      </div>
    );
  }
}

const mapStateToProps = state => {
  console.log(state);
  return {
    movies : state.movies
  };
}

export default connect(mapStateToProps)(ListMovieReviews);