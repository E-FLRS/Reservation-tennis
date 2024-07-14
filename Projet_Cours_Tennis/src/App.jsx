
import './App.css'
import {Link} from "react-router-dom";


function App() {


  return (
    <>
      <h1> Réservation de courts de tennis </h1>
      <hr />
      <Link to ={'/principal'}><button> Courts de tennis </button></Link>
    </>
  )
}

export default App
