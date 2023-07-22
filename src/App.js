import './App.css';
import {PropTypes} from "prop-types";
import Navbar from './Navbar';

function App() {
  return (
    <div className="App">
     <Navbar />
     <Description/>
     <Search text = "add search"/>
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

function Search(props) {
  return (
    <form>
      <label for='search_request'></label>
      <input type="text" id='search_request' value= {props.text}/>
    </form>
  );
}

Search.propTypes = {
  text: PropTypes.string,
};


export default App;
