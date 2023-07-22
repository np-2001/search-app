import React from 'react'

import Navbar from './Navbar'

import { useState, useEffect } from "react";

function Search() {
  return (
    <div className='searchpage'> 
    <Navbar />
    <Searchbar/>
    
    </div>
    
  )
}

function Searchbar() {
    const [searchData,setSearchData] = useState([]);
    const [Search, SetSearch] = useState("");
    const [Entered, SetEntered] = useState("")
    
    useEffect(() => {
        // Load search data from localStorage when the component mounts
        const storedData = localStorage.getItem('searchData');
        if (storedData) {
          setSearchData(JSON.parse(storedData));
        }
      }, []);
    
      useEffect(() => {
        // Save search data to localStorage whenever it changes
        localStorage.setItem('searchData', JSON.stringify(searchData));
      }, [searchData]);

    const handleChange = (event) => {
        SetSearch(event.target.value);
      };

    const Enter = (event) => {
        if (event.key === 'Enter') {
          // 👇 Get input value
            SetEntered(Search);
            setSearchData((prevsearchData) => [...prevsearchData, Search]);
            SetSearch(''); // Clear the search bar after appending
            SetEntered('');
        }
      };
    const handleClear = () => {
        setSearchData([]); // Clear the searchData array
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
            <h3> {searchData} </h3>
        </div>
    );
}
export default Search