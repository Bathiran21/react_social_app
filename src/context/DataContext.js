import {createContext,useState,useEffect} from 'react'
import {format} from 'date-fns'
import useWindowSize from "../hooks/useWindowSize"
import { useNavigate } from 'react-router-dom';

const DataContext = createContext({})

export const DataProvider = ({children}) => {
    
    const [posts, setPosts] = useState(JSON.parse(localStorage.getItem('posts_list')) || []);
    const [search, setSearch] = useState('');
    const [searchResults,setSearchResults] = useState('')
    const [postTitle, setPostTitle] = useState('');
    const [postBody, setPostBody] = useState('');
    const [editTitle,setEditTitle] = useState('');
    const [editBody,setEditBody] = useState('');
    const {width} = useWindowSize();

  
    const navigate = useNavigate()
  
    useEffect(()=>{
      const filteredResults = posts.filter((post) =>
        ((post.body).toLowerCase()).includes(search.toLowerCase())
        || ((post.title).toLowerCase()).includes(search.toLowerCase()));
      setSearchResults(filteredResults.reverse())
  
    },[posts,search])
  
  
    const handleSubmit = (e) => {
      e.preventDefault()
      const id = posts.length ? posts[posts.length - 1].id +1 : 1;
      const datetime = format(new Date(),'MMMM dd,yyyy pp');
      const newPost = {id,title:postTitle,datetime,body:postBody}

        const allPost = [...posts,newPost]
        setPosts(allPost);
        localStorage.setItem('posts_list',JSON.stringify(allPost))

        setPostTitle('');
        setPostBody('');
        navigate('/');
    }

    const handleEdit = (id) =>{
      
      const datetime = format(new Date(),'MMMM dd,yyyy pp')
      console.log(id)
    
      const postsList = posts.map(post => (post.id) === id ? {id:id,title:editTitle,datetime,body:editBody} :  post);
      setPosts(postsList)
      localStorage.setItem('posts_list',JSON.stringify(postsList))
      setEditTitle('');
      setEditBody('');
      navigate('/');
    }
  
    const handleDelete = (id) => {  
      console.log(id)
     
        const postsList = posts.filter(post => post.id !== id)
        setPosts(postsList);
        localStorage.setItem('posts_list',JSON.stringify(postsList))
        navigate('/');
    }
  

    return(
        <DataContext.Provider value={{
          width,search,setSearch,
          searchResults,
          postTitle,setPostTitle,postBody,setPostBody,handleSubmit,
          posts,handleDelete,
          handleEdit,editTitle,setEditTitle,editBody,setEditBody

        }}>
            {children}
        </DataContext.Provider> 
    )
}

export default DataContext