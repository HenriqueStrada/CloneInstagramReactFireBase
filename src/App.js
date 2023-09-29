import logo from './logo.svg';
import './App.css';
import './firebase';
import {useEffect, useState} from "react";

function App() {
  const[user, setUser] = useState(null);

  useEffect(() => {

  }, []);

  useEffect(() => {

  }, []);


  return (
    <div className="App">
      <div className="header">
        <div className="center">
            <div className="header_logo">
              <a><h1>Instagram</h1></a>
            </div>
            <div className="header_loginForm">
              <form>
                <input type="text" placeholder="Login..."/>
                <input type="password" placeholder="Senha..."/>
                <input type="submit" name="acao" value="Logar!"/>
              </form>
            </div>
        </div>
      </div>
    </div>
  );
}

export default App;
