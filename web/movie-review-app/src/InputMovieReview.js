import React, { Component } from 'react';
import { connect } from 'react-redux';
import { addTextReview } from './Action';

class InputMovieReview extends Component {
  constructor(props) {
    super(props)
    this.state = {
      textReview: '',
      movieTitle: ''
    };
    this.onClick = this.onClick.bind(this);
  }

  updateInputTextReview = evt => {
    this.setState({
      textReview: evt.target.value
    });
  }

  updateInputMovieTitle = evt => {
    this.setState({
      movieTitle: evt.target.value
    });
  }

  onClick = () => {
    if (this.state.movieTitle === '' || this.state.textReview === '') {
      alert("Form cannot be empty!")
    } else {
      addTextReview(this.state.movieTitle, this.state.textReview)
    }
  }

  render() {
    return (
      <div>
        <label>What movie do you want to review?</label>
        <div style={{textAlign: "center"}}>
          <input type="text" className="form-control" value={this.state.movieTitle} onChange={evt => this.updateInputMovieTitle(evt)}/>
        </div>
        <label>How is it?</label>
        <div style={{textAlign: "center"}}>
          <textarea className="form-control" rows="2" value={this.state.textReview} onChange={evt => this.updateInputTextReview(evt)}/>
        </div>
        <button style={{flex: '1', marginTop: '10px', marginBottom: '10px'}} type="button" className="btn btn-primary" onClick={() => this.onClick()}>Submit</button>
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => {
  return {
    addTextReview: (textReview, movieTitle) => dispatch(addTextReview(textReview, movieTitle))
  }
}

export default connect(null, mapDispatchToProps)(InputMovieReview);