import type { PostType } from '../types/post';
import type { FC } from 'react';

interface Postprops{
    posts:PostType[]
}


const posts: PostType[] = [
  {
    author: "Aziza",
    title: "Getting Started with React",
    desc: "A beginner-friendly introduction to building user interfaces with React.",
    date: new Date("2026-09-15"),
  },
  {
    author: "John",
    title: "Understanding TypeScript",
    desc: "Learn how TypeScript adds type safety and better developer experience to JavaScript.",
    date: new Date("2026-09-17"),
  },
  {
    author: "Alice",
    title: "Building Components",
    desc: "Explore how reusable components can help you build maintainable React applications.",
    date: new Date("2026-09-20"),
  },
];

export const PostListComponent= ({posts}:Postprops)=>{
    return(
        <div id="post-list">
            {posts.map((post)=>(
                <article key={post.title} className="post">
                    <h2>{post.title}</h2>
                    <p>{post.desc}</p>
                    <small>By {post.author} On {post.date.toLocaleDateString()}</small>
                </article>
            ))}
        </div>
    )
}