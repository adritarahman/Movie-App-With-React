import React from 'react'

const Search = (props) => {
  return (
    <div className='search'>
       <div>
        
        <img src="./search.svg" alt="" />
       
        <input type="text" 
        placeholder='Search Your Movie'
        value={props.searchTerm}
        onChange={(e)=>props.setsearchTerm(e.target.value)}
        
        />
        </div>
      
    </div>
  )
}

export default Search
