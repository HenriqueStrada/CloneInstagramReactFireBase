import {useEffect, useState} from "react";
import {auth} from './firebase';
function Header(props){
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
        }).catch((err)=>{
            alert(err.message);
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

    <div className="center">
        <div className="header_logo">
            <a><h1>Instagram</h1></a>
        </div>
        {
            (props.user)?
                <div className="header_logadoInfo">
                    <span>Olá <b>{props.user}</b></span>
                    <a href="#">Postar!</a>
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