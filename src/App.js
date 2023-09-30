import './App.css';
import {db} from './firebase';
import {useEffect, useState} from "react";
import Header from "./Header";

function App() {
    const[user, setUser] = useState();

  useEffect(() => {

  }, []);

  useEffect(() => {

  }, []);


  return (
    <div className="App">
        <Header setUser={setUser} user={user}></Header>
    </div>
  );
}

export default App;
