import React from 'react'

const MovieCard = ({movie}) => {
  return (
    <div className='movie-card'>
       <img src={movie.poster_path ? `https://image.tmdb.org/t/p/w500/${movie.poster_path}` : '/no-movie.png'} alt={movie.title} />

       <div className='mt-4'>
        <h3>{movie.title}</h3>
       </div>


      <div className='content'>
       <div className='rating'>
        <img src="./star.svg" alt="" className='w-4 h-4' />
        <p className='text-white text-s'>{movie.vote_average.toFixed(1)}</p>
       </div> 
        <span className='text-white'>•</span>
        <p className='text-white text-s'>{movie.original_language}</p>
        <span className='text-white'>•</span>
        <p className='text-white text-s' >{movie.release_date.split('-')[0]}</p>

        </div>
       </div>

    

  )
}

export default MovieCard
