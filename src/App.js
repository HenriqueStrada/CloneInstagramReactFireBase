import './App.css';
import {auth, db} from './firebase';
import {useEffect, useState} from "react";
import Header from "./Header";
import Post from "./Post";

function App() {
    const[user, setUser] = useState();
    const [posts, setPosts] = useState([]);

  useEffect(() => {

      db.collection("posts").orderBy("timestamp", "desc").onSnapshot(function(snapshot){
        setPosts(snapshot.docs.map(function(document){
            return{id:document.id,info:document.data()}
        }))
      })
      auth.onAuthStateChanged(function(val) {
          if (val) {
              setUser(val.displayName);
          } else {
              // Se val for null, você pode definir o usuário como null ou realizar outra ação apropriada
              setUser(null);
          }
      });

  }, []);


  return (
    <div className="App">
        <Header setUser={setUser} user={user}></Header>

        {
            posts.map(function (val){
                return(
                    <Post info={val.info} id={val.id}/>
                )
            })
        }
    </div>
  );
}

export default App;
