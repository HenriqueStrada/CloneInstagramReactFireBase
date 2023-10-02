import {useEffect, useState} from "react";
import firebase from 'firebase/compat/app';
//import da autenticação, espaço, e banco de dados
import {auth, storage, db} from './firebase';
import {upload} from "@testing-library/user-event/dist/upload";
function Header(props){

    const [progress, setProgress] = useState(0);
    const [file, setFile] = useState(0);
    useEffect(()=>{
        props.setUser();
    }, [])

    function logar(e){
        e.preventDefault();
        let email = document.getElementById("email-login").value;
        let password = document.getElementById("password-login").value;

        auth.signInWithEmailAndPassword(email, password)
            .then((auth)=>{
                props.setUser(auth.user.displayName);
                alert("Logado com sucesso!");
                window.location.href = "/";
        }).catch((err)=>{
            alert(err.message);
        })
    }
    function deslogar(e){
        e.preventDefault();
        auth.signOut().then(function(val){
            props.setUser();
            window.location.href = "/";
        })
    }
    function criarConta(e){
        e.preventDefault();
        let email = document.getElementById("email-cadastro").value;
        let username = document.getElementById("username-cadastro").value;
        let password = document.getElementById("password-cadastro").value;
        //Criar conta firebase;
        auth.createUserWithEmailAndPassword(email, password)
            .then((authUser)=>{
                authUser.user.updateProfile({
                    displayName:username
                })
                alert("Conta criada com sucesso!")
                let modal = document.querySelector(".modalCriarConta");
                modal.style.display = "none";
        }).catch((error)=>{
            alert(error.message);
        })
    }

    function abrirModalCriarConta(e){
        e.preventDefault();
        let modal = document.querySelector(".modalCriarConta");
        modal.style.display = "block";
    }
    function fecharModalCriar(){

        let modal = document.querySelector(".modalCriarConta");
        modal.style.display = "none";
    }

    function abrirModalUpload(e){
        e.preventDefault();
        let modal = document.querySelector(".modalUpload");
        modal.style.display = "block";
    }
    function fecharModalUpload(e){
        let modal = document.querySelector(".modalUpload");
        modal.style.display = "none";
    }

    function uploadPost(e){
        e.preventDefault();
        let tituloPost = document.getElementById("titulo-upload").value;
        let progressEl = document.getElementById("progress-upload").value;

        const uploadTask = storage.ref(`images/${file.name}`).put(file);

        uploadTask.on("state_changed", function (snapshot){
            const progress = Math.round(snapshot.bytesTransferred/snapshot.totalBytes) * 100;
            setProgress(progress);
        },function (error){

        },function (){
            storage.ref("images").child(file.name).getDownloadURL()
                .then(function(url){
                    db.collection("posts").add({
                        titulo: tituloPost,
                        image: url,
                        userName: props.user,
                        timestamp: firebase.firestore.FieldValue.serverTimestamp()
                    })
                    setProgress(0);
                    setFile(null);
                    alert("Upload Realizado com sucesso!");
                    document.getElementById("form-upload").reset();
                })
        })
    }
    return(
<div className="header">

    <div className="modalCriarConta">
        <div className="formCriarConta">
            <div onClick={()=> fecharModalCriar()} className="close-modal-criar">
                X
            </div>
            <h2>Criar Conta</h2>
            <form onSubmit={(e)=>criarConta(e)}>
                <input id="email-cadastro" type="text" placeholder="Seu e-mail..."/>
                <input id="username-cadastro" type="text" placeholder="Seu username..."/>
                <input id="password-cadastro" type="password" placeholder="Sua senha..."/>
                <input type="submit" value="Criar Conta!"/>
            </form>
        </div>
    </div>

    <div className="modalUpload">
        <div className="formUpload">
            <div onClick={()=> fecharModalUpload()} className="close-modal-criar">
                X
            </div>
            <h2>Fazer Upload</h2>
            <form id="form-upload" onSubmit={(e)=>uploadPost(e)}>
                <progress id="progress-upload" value={progress}></progress>
                <input id="titulo-upload" type="text" placeholder="Nome da sua foto..."/>
                <input onChange={(e)=>setFile(e.target.files[0])} type="file" name="file"/>
                <input type="submit" value="Postar no Instagram!"/>
            </form>
        </div>
    </div>

    <div className="center">
        <div className="header_logo">
            <a><h1>Instagram</h1></a>
        </div>
        {
            (props.user)?
                <div className="header_logadoInfo">
                    <span>Olá <b>{props.user}</b></span>
                    <a onClick={(e)=>abrirModalUpload(e)} href="#">Postar!</a>
                    <a onClick={(e)=>deslogar(e)}>Deslogar</a>
                </div>
                :
                <div onSubmit={(e)=>logar(e)} className="header_loginForm">
                    <form>
                        <input id="email-login" type="text" placeholder="Login..."/>
                        <input id="password-login" type="password" placeholder="Senha..."/>
                        <input type="submit" name="acao" value="Logar!"/>
                    </form>
                    <div className="btn_criarConta">
                        <a onClick={(e)=> abrirModalCriarConta(e)} href="#">Criar Conta!</a>
                    </div>
                </div>
        }
    </div>
</div>
    )
}

export default Header;