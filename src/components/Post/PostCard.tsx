// components/Post/PostCard.tsx

import React from 'react';
import './PostCard.css';

interface Props {
  title: string;
  author: string;
  onClick:React.MouseEventHandler
}

const PostCard: React.FC<Props> = React.memo(({title, author, onClick}) => {
  // console.log('[PostCard] render');
  //
  // useEffect(() => {
  //   console.log('[PostCard] mounted/updated!');
  // });

  return (
    <article className="PostCard" onClick={onClick}>
      <h1>{title}</h1>
      <div className="Info">
        <div className="Author">{author}</div>
      </div>
    </article>
  );
}, (prevProps, nextProps) => {
  return nextProps.title === prevProps.title && nextProps.author === prevProps.author;
});

export default PostCard;