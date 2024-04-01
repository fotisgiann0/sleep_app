import './App.css';
import axios from "axios"; 
import { useEffect, useState } from 'react';

function App() {
  const [listofposts, setlistofposts] = useState([]);


  useEffect(() => {
    axios.get("http://localhost:3001/posts/1").then((response) => {
      setlistofposts(response.data);
    });
  }, [])
  
  return( 
     <div className="App">
    {listofposts.map((value, index) => {
      return (
      <div className="post">
        <div className="name"> {value.name} </div>
        <div className="explain"> date | hours </div>
        <li key = {index}>{value.mera.slice(0,10)} | {value.hours} </li>
        </div>
        )
      
    })}
  </div>
  );
} 

export default App;
