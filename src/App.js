import './App.css';
import {PropTypes} from "prop-types";
function App() {
  return (
    <div className="App">
     <Description/>
     <Search text = "add search"/>
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
function Search(props) {
  return (
    <form>
      <label for='search_request'> Enter search request: </label>
      <input type="text" id='search_request' value= {props.text}/>
    </form>
  );
}

Search.propTypes = {
  text: PropTypes.string,
};
//Button to go to website_query
function Website_Query(){
  return (
    <button>Enter website urls</button>
  );
}
export default App;
