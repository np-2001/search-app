import './App.css';

function App() {
  return (
    <div className="App">
     <Description/>
     <Search/>
     <Website_Query/>
    </div>
  );
}

function Description() {
  return (
    <div>
      <h1>Advanced Search Filter</h1>
      <p> Add websites you want to search then give a prompt!</p>
    </div>
  );
}
function Search() {
  return (
    <form>
      <label for='search_request'> Enter search request: </label>
      <input type="text" id='search_request'/>
    </form>
  );
}

function Website_Query(){
  return (
    <button>Enter website urls</button>
  );
}
export default App;
