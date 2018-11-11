import React from 'react';

const CardMovieReview = props => {
  return (
    <div className="list-group-item list-group-item-action flex-column align-items-start active container">
      <div className="d-flex w-70 justify-content-between">
        <h5 className="mb-1">{props.movie.movieTitle}</h5>
      </div>
      <div className="row">
        <div className="col-10">
          <div style={{overflowY : 'auto', height: '15vh'}}>
            <p className="mb-1">{props.movie.textReview}</p>
          </div>
        </div>
        <div className="col-2 container">
          <div class="row">
            <div class="col">
              <h2 className="d-inline">Act </h2>
            </div>
            <div class="col">
              {props.movie.act === -1 ? <i style={{fontSize: '35px'}} className="fas fa-thumbs-down d-inline"></i> : <i style={{fontSize: '30px'}} className="fas fa-thumbs-up d-inline"></i>}
            </div>
            <div class="w-100"></div>
            <div class="col">
              <h2 className="d-inline">Plot </h2>
            </div>
            <div class="col">
            {props.movie.plot === -1 ? <i style={{fontSize: '35px'}} className="fas fa-thumbs-down d-inline"></i> : <i style={{fontSize: '30px'}} className="fas fa-thumbs-up d-inline"></i>}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default CardMovieReview;