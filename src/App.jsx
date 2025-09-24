
import { useEffect , useState } from 'react'
import './App.css'
import Search from './components/Search'

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
   useEffect(() => {
      fetchMovies()
   }, [])
   
const fetchMovies =async ()=>{
  try{

    const end_point=`${API_BASE_URL}/discover/movie?sort_by=popularity.desc`;
    const response=await fetch(end_point,API_OPTIONS)
    if(!response.ok){
      throw new Error('Failed to fetch movies')
    }

    const data=await response.json();
    console.log(data);
    


     
  }catch(error){
    console.log(error)
    setErrorMessage("Error Fetching Movies")
    
  }
}




  return (
    <main>

      <div></div>
      <div className='wrapper'>
        <header className='bg-[url(./BG.png)] bg-cover bg-center h-screen w-full'>
          <img src="./hero-img.png" alt="Hero Banner"/>
          <h1>Find <span className="text-gradient">Movies</span> you will like</h1>

          <Search searchTerm={searchTerm} setsearchTerm={setsearchTerm}/>
          <h1>{searchTerm}</h1>
        </header>
        
        <section>
          <h2>All Movies</h2>
          {errorMessage && <p className='text-red-500'> {errorMessage}</p>}
          
          
        </section> 
        
       
      </div>
    </main>
  )
}

export default App
