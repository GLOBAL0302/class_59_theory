import "./PostCard.css"
import React, {useEffect} from "react";
interface Props{
    title:string
    author:string
}

const PostCard:React.FC<Props> = React.memo(({title, author}) => {

    console.log("[PostCard] render")

    useEffect(() => {
        console.log("[PostCard] Mounted")
    });

    return (
        <article className="PostCard">
            <h1>{title}</h1>
            <div className="Info">
                <div className="Author">{author}</div>
            </div>
        </article>

    );
},(prevProps, nextProps)=>{
    return prevProps.author === nextProps.author && prevProps.title === nextProps.title
});

export default PostCard;