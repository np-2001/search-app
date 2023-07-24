import './App.css';


import {PropTypes} from "prop-types";
import Navbar from './Navbar';
import Search from './Search';
import { useState, useEffect } from "react";
import GoogleAutocomplete from "react-google-autocomplete";

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
  return (
    <div>
      <p> Add websites you want to search then give a prompt!</p>
    </div>
  );
}


function Searches({ searchRequested, setSearchRequested }) {
  const [Searching, setSearching] = useState("");
  const [url, setUrl] = useState("");
  const [url1, setUrl1] = useState("");
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
    if (url1.length > 0) {
      setUrl(url1);
    }
  }, [url1]);

  useEffect(() => {
    // Save search data to localStorage whenever it changes
    if (searchRequested.length > 0) {
      window.localStorage.setItem('searchRequested', JSON.stringify(searchRequested));
      const storedWebsitesData = JSON.parse(window.localStorage.getItem('searchData'));
      const searchDataArray = Array.isArray(storedWebsitesData) ? storedWebsitesData : [];
      const apikey = 'AIzaSyCoCox1qCJabHvB9ALzBPwKEmS_bmCFnOo';
      const SearchEngine_ID = 'd1d2ac321324e40ab';
      const sitesToSearch = searchDataArray.join(',') || '';
      const apiUrl = `https://www.googleapis.com/customsearch/v1?key=${apikey}&cx=${SearchEngine_ID}&q=${searchRequested}&sitesearch=${sitesToSearch}`;
      fetch(apiUrl)
        .then((response) => response.json())
        .then((data) => {
          // Update the state with the search results
          setUrl(data.items);
        })
        .catch((error) => {
          console.error('Error fetching search results:', error);
        });
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
      <div>
        {/* Render search results */}
        {Array.isArray(url) &&
          url.map((result, index) => (
            <div key={index}>
              <h2>{result.title}</h2>
              <a href={result.link} target="_blank" rel="noopener noreferrer">
                {result.formattedUrl}
              </a>
            </div>
          ))}
      </div>
    </div>
  );
}

export default App;
