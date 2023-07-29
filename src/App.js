
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
  const [searching, setSearching] = useState("");

  useEffect(() => {
    // Clear the searchRequested state when the Searches component mounts
    setSearchRequested("");
  }, []);

  useEffect(() => {
    // Save search data to localStorage whenever it changes
    if (searchRequested.length > 0) {
      window.localStorage.setItem("searchRequested", JSON.stringify(searchRequested));
      // Call the function to fetch search results
      fetchSearchResults();
    }
  }, [searchRequested]);

  const fetchSearchResults = async () => {
    const websiteList = ["reddit.com", "youtube.com"];
    const websiteQuery = websiteList.map((website) => `site:${website}`).join("|");
    const apiKey = "cbf04eda8f0340f0b0f28fd09e433f3a";
    const searchEndpoint = "https://api.bing.microsoft.com/v7.0/search";
    
    try {
      const storedWebsitesData = JSON.parse(window.localStorage.getItem('searchData'));
      const sitesToSearch = Array.isArray(storedWebsitesData) ? storedWebsitesData : [];
      const query = `${searchRequested} ${sitesToSearch.map((website) => `site:${website}`).join(" ")}`;

      const response = await fetch(
        `${searchEndpoint}?q=${encodeURIComponent(query)}`,
        {
          headers: {
            "Ocp-Apim-Subscription-Key": apiKey,
          },
          
        }
      );

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const data = await response.json();
      setSearchResults(data.webPages.value);
    } catch (error) {
      console.error("Error fetching search results:", error);
    }
  };

  const handleSearchingChange = (event) => {
    setSearching(event.target.value);
  };

  const handleEnterSearch = (event) => {
    if (event.key === "Enter") {
      // Get input value from searchRequested state and update it
      setSearchRequested(event.target.value);
    }
  };

  return (
    <div>
      <form onSubmit={(e) => e.preventDefault()}>
        <label htmlFor="search_request"></label>
        <input
          type="text"
          id="search_request"
          onChange={handleSearchingChange}
          onKeyDown={handleEnterSearch}
        />
      </form>
      <div>
        {/* Render search results */}
        {Array.isArray(searchResults) &&
          searchResults.map((result, index) => (
            <div key={index}>
              <h2>{result.name}</h2>
              <a href={result.url} target="_blank" rel="noopener noreferrer">
                {result.url}
              </a>
            </div>
          ))}
      </div>
    </div>
  );
}

