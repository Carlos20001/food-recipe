import React, {useState} from 'react'; 
import './App.css'
import Axios from 'axios';
import Recipe from './component/Recipe'
import {v4 as uuidv4} from 'uuid'
import Alert from './component/Alert'

const App = () => {

const [query, setQuery] = useState("");
const [recipes, setRecipes] = useState([]);
const [alert, setAlert] = useState("");

const APP_ID = "3582685c";

const APP_KEY = "d1288ade285e9c5036a644ca573c0bf2";

const url = `https://api.edamam.com/search?q=${query}&app_id=${APP_ID}&app_key=${APP_KEY}`;

const getData = async () => {
  if(query !== "") {
    const result = await Axios.get(url);
    if(!result.data.more){
      return setAlert('Sorry! We do not have it')
    }
    setRecipes(result.data.hits)
    console.log(result)
    setAlert("");
    setQuery("");
  } else {
    setAlert('Please fill in')
  }
 
};

const onChange = (e) => {
  setQuery(e.target.value);
}

const onSubmit = (e) => {
  e.preventDefault();
  getData();
}


  return (
    <div className="App">
    <h1 onClick={getData}>Hello Food</h1>
    <form className="search-form" onSubmit={onSubmit}>
     {alert !== "" && <Alert alert={alert} />}
      <input type="text" placeholder="Search Food" autoComplete="off" onChange={onChange} value={query}/>
      <input type="submit" value="search" />
    </form>
    <div className="recipes">
      {recipes !== [] && recipes.map(recipe =>
        <Recipe key={uuidv4()} recipe = {recipe} />)}
    </div>
    </div>
  )
}

export default App
