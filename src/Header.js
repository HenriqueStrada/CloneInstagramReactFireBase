import {useEffect, useState} from "react";

function Header(props){
    useEffect(()=>{
        props.setUser("Deivid");
    }, [])

    return(
<div className="header">
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
                <div className="header_loginForm">
                    <form>
                        <input type="text" placeholder="Login..."/>
                        <input type="password" placeholder="Senha..."/>
                        <input type="submit" name="acao" value="Logar!"/>
                    </form>
                    <div className="btn_criarConta">
                        <a href="#">Criar Conta!</a>
                    </div>
                </div>
        }
    </div>
</div>
    )
}

export default Header;