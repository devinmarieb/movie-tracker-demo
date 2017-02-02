const movieReducer = (state = [], action) => {
  switch(action.type){
    case 'ADD_MOVIES':
      return action.movies
  }
  return state;
}

export default movieReducer;