import type { PostType } from '../types/post';
import {useState} from 'react';
import {isNewPost} from '../utilies/NewPostDate';
import {PostComponent} from '../components/PostComponent';
import '../styles/PostListStyles.css';
import {withLogger} from './HocComponent';


interface Postprops{
    posts:PostType[]
}

const LoggedPost=withLogger(PostComponent);


export const PostListComponent= ({posts}:Postprops)=>{
    const [selectedPost,setSelectedPost]=useState<PostType | null>(null);

    if(selectedPost){
        return(
            <LoggedPost post={selectedPost} onBack={()=>setSelectedPost(null)}/>
        )
    }
    return(
        <div id="post-list">
            {posts.map((post)=>(
                <article key={post.title} className={post.author ==='John'?'highlighted':'post'}>
                    {isNewPost(post.date) && <span className="new-post-badge">New Post</span>}
                    <h2>{post.title}</h2>
                    <p>{post.desc}</p>
                    <small  style={{fontStyle:"italic"}}>By {post.author} On {post.date.toLocaleDateString()}</small>
                    <button onClick={()=>setSelectedPost(post)}>learn more</button>
                </article>
            ))}
        </div>
    )
}