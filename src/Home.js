import { useContext } from "react"
import Feed from "./Feed"
import DataContext from "./context/DataContext"
import { Link } from "react-router-dom";
import { FaPlus } from "react-icons/fa";

const Home = () => {
  const {searchResults,fetchError,isLoading} = useContext(DataContext)
  return (
    <main className="Home">
      {isLoading && <p className="statusMsg">Loading posts...</p>}

      {!isLoading && fetchError && <p className="statusMsg">{fetchError}</p>}

      {!isLoading && !fetchError && (searchResults.length ? <Feed posts = {searchResults} /> 
        : <div className="nopostpage">
            <p>Add Post</p>
            <Link to='post'>
              <FaPlus />
            </Link>  
            </div>   
        )
      }
    </main>
  )
}

export default Home