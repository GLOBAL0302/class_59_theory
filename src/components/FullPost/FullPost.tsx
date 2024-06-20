import React, {useCallback, useEffect, useState} from 'react';
import "./FullPost.css"
import {ApiPost} from "../../types";
import axios from "axios";
import apiRoutes from "../../apiRoutes";

interface Props {
    id: number | null;
}


const FullPost: React.FC<Props> = ({id}) => {
    const [post, setPost] = useState<null | ApiPost>(null)

    const fetchPost = useCallback(async () => {
        if (id !== null) {
            const {data: post} = await axios.get<ApiPost>(apiRoutes.onePost(id))

            setPost(post)
        }
    }, [id]);

    useEffect(() => {
        void fetchPost()
    }, [fetchPost]);
    return post && (
        <div className="FullPost">
            <h1>{post.title}</h1>
            <p>{post.body}</p>
        </div>
    );
};

export default FullPost;