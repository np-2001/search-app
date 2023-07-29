import React from 'react'

function Navbar() {
    
    return (
        <nav className="navbar">
            <h1> Advanced Searcher </h1>
            <div className="pages">
                <a href='/'> Home</a>
                <a href='/search'> Websites </a>
            </div>
        </nav>
    );
}

export default Navbar