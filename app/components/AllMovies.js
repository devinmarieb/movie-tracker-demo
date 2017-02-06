import React, {Component} from 'react';
import {Link} from 'react-router';
import _ from 'underscore';
import MovieIndex from '../containers/MovieIndex-container';
import filterFavorites from './filterFavorites';

export default class AllMovies extends Component{


  // filterFavorites (dbFavs, newFavs) {
  //   let added = newFavs.map((stuff) => {
  //     return stuff.add
  //   })
  //   let deleted = newFavs.map((stuff) => {
  //     return stuff.del
  //   })
  //   let finalFaves = (dbFavs).concat(added) || []
  //   let noDuplicates = _.uniq(finalFaves, (movie) => {
  //     return movie.title;
  //   });
  //   this.props.setFinalFavs(noDuplicates);
  //   // this.props.switchToFavs();
  // }

  moveToFavorites(db, newFavs){
    let noDuplicates = filterFavorites(db, newFavs);
    this.props.setFinalFavs(noDuplicates);
  }


  render(){
    return(
      <div>
        <Link to={'/favorites'} >
          {this.props.userSignInReducer.user && !this.props.movieReducer.toggle ? <button className='favs' onClick={() => this.moveToFavorites(this.props.userSignInReducer.fav.data.data, this.props.movieIndexReducer)}> Show Favorites </button> : ''}
        </Link>
        <MovieIndex movies={this.props.movieReducer.movies}/>
      </div>
    )
  }
}
