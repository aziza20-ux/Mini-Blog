import type { PostType } from '../types/post';
import {memo} from 'react'


interface Postprops{
    post:PostType;
    onBack:()=>void
}

export const PostComponent=memo(({post,onBack}:Postprops)=>{
    return (
        <>
             <button onClick={onBack}>Back</button>
            <article className="post">
            
                <h2>{post.title}</h2>
                <p>Author: {post.author}</p>
                <p>Date: {post.date.toLocaleDateString()}</p>
                <p>{post.desc}</p>
            </article>
        </>

    )
})