import './App.css';


import {PropTypes} from "prop-types";
import Navbar from './Navbar';
import Search from './Search';
import { useState, useEffect } from "react";

function App() {
  const [Search_Requested,setSearch_Requested] = useState("");
  return (
    <div className="App">
     <Navbar />
     <Description/>
     <Searches searchRequested={Search_Requested} setSearchRequested={setSearch_Requested}/>
    </div>
  );
}



function Description() {
  const storedData = window.localStorage.getItem('searchData');
  const searchData = storedData != null ? JSON.parse(storedData) : [];

  return (
    <div>
      <p> Add websites you want to search then give a prompt!</p>
    </div>
  );
}


function Searches({ searchRequested, setSearchRequested }) {
  const [Searching, setSearching] = useState("");

  useEffect(() => {
    // Initialize searchRequested with the value from localStorage
    const storedData = window.localStorage.getItem('searchRequested');
    if (storedData != null) {
      setSearchRequested(JSON.parse(storedData));
    }
  }, [setSearchRequested]);

  const SearchingChange = (event) => {
    setSearching(event.target.value);
  };

  const EnterSearch = (event) => {
    if (event.key === 'Enter') {
      // Get input value from Searching state and update searchRequested state
      setSearchRequested(Searching);
    }
  };

  useEffect(() => {
    // Save search data to localStorage whenever it changes
    if (searchRequested.length > 0) {
      window.localStorage.setItem('searchRequested', JSON.stringify(searchRequested));
    }
  }, [searchRequested]);

  return (
    <div>
      <form>
        <label htmlFor='search_request'></label>
        <input 
          type="text" 
          id='search_request' 
          onChange={SearchingChange}
          onKeyDown={EnterSearch}
        />
      </form> 
      
    </div>
  );
}

export default App;
