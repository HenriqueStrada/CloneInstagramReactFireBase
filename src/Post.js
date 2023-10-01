function Post(props){
    function comentar(id, e){
        e.preventDefault();
        alert("Comentando no post: " + id);
    }
    return(
        <div className="postSingle">
            <img src={props.info.image}/>
            <p><b>{props.info.userName}</b>:{props.info.titulo}</p>
            <form onSubmit={(e)=>comentar(props.id,e)}>
                <textarea></textarea>
                <input type="submit" value="Comentar!"/>
            </form>
        </div>
    )
}
export default Post;