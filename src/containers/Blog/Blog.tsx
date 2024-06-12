import "./Blog.css"
import {useEffect, useState} from "react";
import {BlogPost} from "../../types";
import PostCard from "../../components/Post/PostCard";

const url= "https://jsonplaceholder.typicode.com/posts?_limit=10"
const Blog = () => {
    const [posts, setPosts]=useState<BlogPost[]>([
        // {title:"test", author:"John", id:"1"},
        // {title:"Hello, world", author:"Jack Black", id:"2"},
        // {title:"Another example", author:"Main Editor", id:"3"},
    ])

    const [showPostForm, setShowPostForm] = useState(true)
    const [counter, setCounter] = useState(0)
    const togglePostForm = ()=>setShowPostForm((prevState)=> !prevState)
    const increaseCounter = ()=>{
        setCounter((prevState)=>prevState + 1)
    }

    useEffect(() => {
        console.log("[Blog] Mounted/Updated")
    });

    useEffect(() => {
        console.log("[BLOG] showPostForm value Changed")
    }, [showPostForm]);

    useEffect(() => {
        const fetchData = async ()=>{
            const response = await fetch(url)
            if(response.ok){
                const posts = await response.json() as BlogPost[]
                const newPosts = posts.map(post =>({
                    id:post.id,
                    title: post.title,
                    author: "John Doe"

                }))
                setPosts(newPosts)
            }
        }
        void fetchData()
    }, []);

    console.log("[Blog] render")

    let postForm = null

    if(showPostForm){
        postForm=(
            <section className="NewPost">
                <p>New post form will be here</p>
            </section>
        )
    }
    return (
        <>
            <section className="Posts">
                {posts.map((post)=>(
                    <PostCard
                        key={post.id}
                        title={post.title}
                        author={post.author}
                    />
                ))}
            </section>
            <hr/>
            <button onClick={increaseCounter}>
                Increase Counter
            </button>
            <section>Counter: {counter}</section>
            <hr/>
            <button onClick={togglePostForm}>
                New Post
            </button>
            {postForm}
        </>
    );
};

export default Blog;