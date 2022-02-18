import './App.css';
import {useEffect} from "react";

function App() {

  const checkStore = () => {
    if (localStorage.length > 0) {

    }
  }

  useEffect(() => {
    checkStore();
  }, [])
  return (
    <div className="App">
      <h1>Loading...</h1>
    </div>
  );
}

export default App;
