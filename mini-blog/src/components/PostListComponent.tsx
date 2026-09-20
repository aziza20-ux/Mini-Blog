import type { PostType } from '../types/post';
import {useState} from 'react';
import {isNewPost} from '../utilies/NewPostDate';
import {PostComponent} from '../components/PostComponent';
import '../styles/PostListStyles.css'

interface Postprops{
    posts:PostType[]
}


export const PostListComponent= ({posts}:Postprops)=>{
    const [selectedPost,setSelectedPost]=useState<PostType | null>(null);

    if(selectedPost){
        return(
            <PostComponent post={selectedPost} onBack={()=>setSelectedPost(null)}/>
        )
    }
    return(
        <div id="post-list">
            {posts.map((post)=>(
                <article key={post.title} className={post.author ==='John'?'highlighted':'post'}>
                    {isNewPost(post.date) && <span className="new-post-badge">New Post</span>}
                    <h2>{post.title}</h2>
                    <p>{post.desc}</p>
                    <small>By {post.author} On {post.date.toLocaleDateString()}</small>
                    <button onClick={()=>setSelectedPost(post)}>learn more</button>
                </article>
            ))}
        </div>
    )
}