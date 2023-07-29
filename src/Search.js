import React from 'react'

import Navbar from './Navbar'

import { useState, useEffect } from "react";

import './Search.css';

function Search() {
  return (
    <div className='searchpage'> 
        <Navbar />
        <Searchbar/> 
    </div>
  );
}

function Searchbar() {
    const [searchData,setSearchData] = useState([]);
    const [Search, SetSearch] = useState("");
    const [Entered, SetEntered] = useState("");
    const [Cleared, SetCleared] = useState(false);
    
    useEffect(() => {
        // Load search data from localStorage when the component mounts
        const storedData = window.localStorage.getItem('searchData');
        if (storedData != null) {
          setSearchData(JSON.parse(storedData));
        }
      }, []);
    
      useEffect(() => {
        // Save search data to localStorage whenever it changes
        if (searchData.length > 0 || Cleared ) {
            window.localStorage.setItem('searchData', JSON.stringify(searchData));
        }
        
        
      }, [searchData]);

    const handleChange = (event) => {
        SetSearch(event.target.value);
      };

    const Enter = (event) => {
        if (event.key === 'Enter') {
          //Get input value
            SetEntered(Search);
            setSearchData((prevsearchData) => [...prevsearchData, Search]);
            SetSearch(''); // Clear the search bar after appending
            SetEntered('');
        }
      };
    const handleClear = () => {
        setSearchData([]); // Clear the searchData array
        SetCleared(true);
    };
    
    return (
        <div className="Searchbar">
            <label> Search: </label>
            <input
                type="text"
                id="Search"
                value={Search}
                onChange={handleChange}
                onKeyDown={Enter}
            />
            <button onClick={handleClear}>Clear</button> {/* Updated the button */}
            <ul>
              {Array.isArray(searchData) && searchData.map((item, index) => (
                <h1 key={index}>{item}</h1>
              ))}
            </ul>
        </div>
    );
}

export default Search