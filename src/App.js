import './App.css';
import './firebase';
import {useEffect, useState} from "react";
import Header from "./Header";

function App() {
    const[user, setUser] = useState("Henrique");

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
