
import { useEffect , useState } from 'react'
import './App.css'
import Search from './components/Search'
import Spinner from './components/Spinner';
import MovieCard from './components/MovieCard';


const API_BASE_URL= 'https://api.themoviedb.org/3';
const API_KEY= import.meta.env.VITE_TMDB_API_KEY;

const API_OPTIONS ={
  method: 'GET',
  headers:{
    accept:'application/json',
    Authorization: `Bearer ${API_KEY}`

  }
}



function App() {
  const [searchTerm, setsearchTerm] = useState("")
  const [errorMessage,setErrorMessage]=useState("")
  const[isLoading, setisLoading]=useState(false)
  const [movieList, setmovieList] = useState([])
  const [debouncedSearchTerm, setdebouncedSearchTerm] = useState('')


  useEffect(() => {
  const id = setTimeout(() => {
    fetchMovies(searchTerm);
  }, 500); // wait 500ms after last keystroke
  return () => clearTimeout(id);
}, [searchTerm]);

   
const fetchMovies =async (query='')=>{
  try{
    setisLoading(true);
    setErrorMessage('')

    const end_point= query ? `${API_BASE_URL}/search/movie?query=${encodeURIComponent(query)} `:
    `${API_BASE_URL}/discover/movie?sort_by=popularity.desc`;
    const response=await fetch(end_point,API_OPTIONS)
    if(!response.ok){
      throw new Error('Failed to fetch movies')
    }

    const data=await response.json();
    console.log(data);
    
    if(data.response=='false'){
       setErrorMessage(data.error||'failed to fetch movies')
        setmovieList([]);
        return;
    }

    setmovieList(data.results || []);

     
  }catch(error){
    console.log(error)
    setErrorMessage("Error Fetching Movies")
    
  }
  finally{
    setisLoading(false)
  }
}




  return (
    <main>

      <div></div>
      <div className='wrapper'>
        <header className='bg-[url(./BG.png)] bg-cover bg-center h-screen w-full'>
          <img src="./hero-img.png" alt="Hero Banner"/>
          <h1>Find <span className="text-gradient">Movies</span> you like</h1>

          <Search searchTerm={searchTerm} setsearchTerm={setsearchTerm}/>
          
        </header>
        
        <section>
          <h2 className='mt-[40px]'>All Movies</h2>
          {errorMessage && <p className='text-red-500'> {errorMessage}</p>}
          {isLoading ? ( <Spinner/>)
          : errorMessage ? ( <p className='text-red-500'>{errorMessage}</p> ) 
          : ( 
          <ul className=' grid grid-cols-4 gap-3 mt-[40px]'>
            {movieList.map((movie)=>(
               <MovieCard key={movie.id} movie={movie}/>
            ))}
          </ul> 
          )

        }
          
          
        </section> 
        
       
      </div>
    </main>
  )
}

export default App
