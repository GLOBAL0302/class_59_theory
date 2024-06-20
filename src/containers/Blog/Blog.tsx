import './Blog.css';
import {useCallback, useEffect, useState} from 'react';
import {ApiPost, ApiUser, BlogPost} from '../../types';
import PostCard from '../../components/Post/PostCard';
import PostForm from '../../components/PostForm/PostForm';
import axios from "axios";
import FullPost from "../../components/FullPost/FullPost";
import apiRoutes from "../../apiRoutes";



const Blog = () => {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [showPostForm, setShowPostForm] = useState(true);
  const [counter, setCounter] = useState(0);
  const[selectedPostId, setSelectedPostId] = useState<number | null>(null)
  const togglePostForm = () => setShowPostForm(prev => !prev);
  const increaseCounter = () => setCounter((prev) => prev + 1);

  // useEffect(() => {
  //   console.log('[Blog] mounted/updated!');
  // }, []);
  //
  // useEffect(() => {
  //   console.log('[Blog] showPostForm value changed!');
  //
  //   return () => {
  //     console.log('[Blog] in useEffect cleanup!');
  //   };
  // }, [showPostForm]);


  const fetchData = useCallback (async () => {
      const postsResponse = await axios.get<ApiPost[]>(apiRoutes.posts);
      const promises = postsResponse.data.map(async (post)=>{
          const userUrl =  apiRoutes.oneUser(post.userId)
          const {data:user} = await axios.get<ApiUser>(userUrl);

          return{
              id:post.id,
              title:post.title,
              author: user.name
          }
      })

      const newPosts = await Promise.all(promises)

      setPosts(newPosts);
  },[]);

  useEffect(() => {

    void fetchData();
  }, [fetchData]);


  let postForm = null;

  if (showPostForm) {
    postForm = (
      <PostForm/>
    );
  }

  return (
    <>
      <section className="Posts">
        {posts.map((post) => (
          <PostCard
            key={post.id}
            title={post.title}
            author={post.author}
            onClick={()=>setSelectedPostId(post.id)}
          />
        ))}
      </section>
        <section>
            <FullPost id={selectedPostId}/>
        </section>
      <hr/>
      <button onClick={increaseCounter}>Increase counter!</button>
      <section>Counter: {counter}</section>
      <hr/>
      <button onClick={togglePostForm}>New post</button>
      {postForm}
    </>
  );
};

export default Blog;