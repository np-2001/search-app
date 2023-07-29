
import './App.css';
import { useState, useEffect } from "react";
import Navbar from './Navbar';
import Search from './Search';

function App() {
  return (
    <div className="App">
      <Navbar />
      <Description />
      <Searches />
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

export default App;

// Searches.js
function Searches() {
  const [searchRequested, setSearchRequested] = useState("");
  const [searchResults, setSearchResults] = useState([]);

  useEffect(() => {
    // Clear the searchRequested state when the Searches component mounts
    setSearchRequested("");
  }, []);

  useEffect(() => {
    // Save search data to localStorage whenever it changes
    if (searchRequested.length > 0) {
      window.localStorage.setItem('searchRequested', JSON.stringify(searchRequested));
      const storedWebsitesData = JSON.parse(window.localStorage.getItem('searchData'));
      const searchDataArray = Array.isArray(storedWebsitesData) ? storedWebsitesData : [];
      // Replace the apikey and SearchEngine_ID with your actual values
      const apikey = "AIzaSyCoCox1qCJabHvB9ALzBPwKEmS_bmCFnOo";
      const SearchEngine_ID = 'd1d2ac321324e40ab';
      const sitesToSearch = searchDataArray || [];
      const apiUrl = `https://www.googleapis.com/customsearch/v1?key=${apikey}&cx=${SearchEngine_ID}&q=${searchRequested}&sitesearch=${sitesToSearch}`;
      fetch(apiUrl)
        .then((response) => response.json())
        .then((data) => {
          // Update the state with the search results
          setSearchResults(data.items);
        })
        .catch((error) => {
          console.error('Error fetching search results:', error);
        });
    }
  }, [searchRequested]);

  const handleSearchingChange = (event) => {
    setSearchRequested(event.target.value);
  };

  const handleEnterSearch = (event) => {
    if (event.key === 'Enter') {
      // Get input value from searchRequested state and update it
      setSearchRequested(event.target.value);
    }
  };

  return (
    <div>
      <form onSubmit={(e) => e.preventDefault()}>
        <label htmlFor='search_request'></label>
        <input
          type="text"
          id='search_request'
          onChange={handleSearchingChange}
          onKeyDown={handleEnterSearch}
        />
      </form>
      <div>
        {/* Render search results */}
        {Array.isArray(searchResults) &&
          searchResults.map((result, index) => (
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

